import { MatSnackBar } from '@angular/material';
import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    userData: any; // Save logged in user data

    constructor(
        private http: HttpClient,
        public afs: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        public ngZone: NgZone, // NgZone service to remove outside scope warning
        public snackBar: MatSnackBar,
    ) {
        /* Saving user data in localstorage when
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    // Sign in with email/password
    SignIn(email, password) {
        console.log('OK PRESSED');
        return this.http.post(
            'https://bigdigi.herokuapp.com/auth/login/',
            {email, password},
         ).subscribe(async (res: {isExecuted: boolean, data: object}) => {
             console.log(res);
             if (res.isExecuted) {
                if (res.data['isVerified']) {
                        await this.router.navigate(['dashboard']);
                    } else {
                        await this.router.navigate(['verify-email-address']);
                    }
             }
         });
        // return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        //     .then((result) => {
        //         this.ngZone.run(async () => {
        //             if (result.user.emailVerified) {
        //                 await this.router.navigate(['dashboard']);
        //             } else {
        //                 await this.router.navigate(['verify-email-address']);
        //             }

        //         });
        //         this.SetUserData(result.user);
        //     }).catch((error) => {
        //         this.snackBar.open(error, 'dismiss', {
        //             duration: 10000,
        //         });
        //         // window.alert(error.message);
        //     });
    }

    // Sign up with email/password
    SignUp(name, email, mobile, password) {
        return this.http.post(
            'https://bigdigi.herokuapp.com/auth/signup/',
            {
                name,
                category: 'user',
                email,
                cell: mobile,
                balance: '0',
                password,
                        }
        );
        // return this.aAuth.auth.createUserWithEmailAndPassword(email, password);
        // .catch(
        //     err => {
        //         this._snackBar.open(err, 'Dismiss', {
        //             duration: 2000,
        //         })
        //     });
    }

    // Send email verfificaiton when new user sign up
    SendVerificationMail() {
        return this.afAuth.auth.currentUser.sendEmailVerification()
            .then(() => {
                this.router.navigate(['verify-email-address']);
            });
    }

    // Reset Forggot password
    ForgotPassword(passwordResetEmail) {
        return this.http.post('https://bigdigi.herokuapp.com/auth/forgetpassword', {
            email: passwordResetEmail
        }).subscribe((res: {message: string}) => {
            console.log(res);
            this.snackBar.open(res.message, 'dismiss');
        });
        return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email has been sent. Please check your inbox.');
            }).catch((error) => {
                this.snackBar.open(error, 'dismiss', {
                    duration: 10000,
                });
            });
    }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    // Sign in with Google
    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    // Auth logic to run auth providers
    AuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['dashboard']);
                });
                this.SetUserData(result.user);
            }).catch((error) => {
                this.snackBar.open(error, 'dismiss', {
                    duration: 10000,
                });
            });
    }

    /* Setting up user data when sign in with username/password,
    sign up with username/password and sign in with social auth
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        };
        return userRef.set(userData, {
            merge: true
        });
    }

    // Sign out
    SignOut() {
        return this.afAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        });
    }

}
