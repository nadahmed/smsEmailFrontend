import { MatSnackBar } from '@angular/material';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserData } from './user';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


interface AuthResponseObject {
    isExecuted: boolean;
    data: UserData;
    message: string;
}

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

    }

    // Sign in with email/password
    SignIn(email, password) {
        return this.http.post(
            'https://bigdigi.herokuapp.com/auth/login/',
            { email, password },
        ).pipe(
            tap(
                async (res: AuthResponseObject) => {
                    console.log(res);
                    if (res.isExecuted) {
                        this.user = res.data;
                        this.token = res.data.accessToken;
                        this.refreshToken = res.data.refreshToken;
                        this.ngZone.run(async () => {
                            if (res.data.isVerified) {
                                await this.router.navigate(['dashboard']);
                            } else {
                                await this.router.navigate(['verify-email-address']);
                            }
                        });
                        // this.SetUserData(res.data);
                    } else {
                        this.snackBar.open(res.message, 'dismiss', {
                            duration: 10000,
                        });
                    }
                },
                (err) => {
                    this.snackBar.open(err.message, 'dismiss', {
                        duration: 10000,
                    });
                }
            )
            );
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
                password,
            }
        )
        .pipe(
            tap(
                (val: AuthResponseObject) => {
                if (!val.isExecuted) {
                    this.snackBar.open(val.message, 'Dismiss', {
                        duration: 10000,
                    });
                }
            },
                error => {
                    this.snackBar.open(error.message, 'Dismiss', {
                        duration: 10000,
                    });
                }
            )
        );
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
        }).subscribe((res: { message: string; }) => {
            console.log(res);
            this.snackBar.open(res.message, 'dismiss');
        });
    }

    // Returns true when user is loged in and email is verified
    get isAuthenticated(): boolean {
        const helper = new JwtHelperService();
        if (!!this.user) {
            return this.user.isVerified && !helper.isTokenExpired(this.refreshToken);
        }
        return false;
    }

    set token(token: string) {
        localStorage.setItem('token', token);
    }

    get token(): string {
        return localStorage.getItem('token');
    }

    set refreshToken(token: string) {
        localStorage.setItem('refreshToken', token);
    }

    get refreshToken(): string {
        return localStorage.getItem('refreshToken');
    }

    renewToken() {
        return this.http.get(
            'https://bigdigi.herokuapp.com/auth/renewtoken/' + this.user.id,
            {
                headers: { refreshToken: this.refreshToken }
            }).pipe(
                tap(
                    (res: {
                        isExecuted: boolean,
                        data: {
                            newAccessToken: string,
                            newRefreshToken: string;
                        },
                        message: string;
                    }) => {
                        if (res.isExecuted) {
                            this.token = res.data.newAccessToken;
                            this.refreshToken = res.data.newRefreshToken;
                        } else {

                        }
                    }
                )
            );
    }

    SetUserData(user: UserData) { }

    set user(user: UserData) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    get user(): UserData {
        return JSON.parse(localStorage.getItem('user'));
    }

    // Sign out
    SignOut() {
        // return this.afAuth.auth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
        // });
    }

}
