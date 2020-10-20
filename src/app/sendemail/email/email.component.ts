import { Carrier, SendingService } from './../../api/sending.service';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/api/auth/auth.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { EmailService } from 'src/app/api/email/email.service';
import { PopinfoComponent } from 'src/app/extras/popinfo/popinfo.component';
import { LoaderComponent } from 'src/app/extras/loader/loader.component';


@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit, OnDestroy {

    @Output() emailChangeEvent = new EventEmitter<any>();


    ////////////////////////
    name = 'ng2-ckeditor';
    ckeConfig: any;
    mycontent: string;
    log = '';
    @ViewChild('myckeditor', { static: false }) ckeditor: any;

    /////////////////////////


    // public Editor = ClassicEditor;


    message = new FormControl('',
        [
            Validators.required,
            Validators.maxLength(384000),
        ]);
    subject = new FormControl('',
        [
            Validators.required,
            Validators.maxLength(78),
        ]);

    email = new FormGroup({
        subject: this.subject,
        message: this.message,
    });

    private subscription: Subscription;

    constructor(
        private emailService: SendingService,
        private dialog: MatDialog,
        ) { }

    ngOnInit() {

        this.emailService.carrier = Carrier.Email;
        ////////////////////////
        this.mycontent = `<p>My html content</p>`;
        /////////////////////////

        this.subscription = this.email.valueChanges.subscribe(() => {
            this.emailChangeEvent.emit(this.email);
        });

        this.emailChangeEvent.emit(this.email);
        ////////////////////////
        this.ckeConfig = {
            allowedContent: false,
            extraPlugins: 'divarea',
            forcePasteAsPlainText: true
        };
        ////////////////////////
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }




    onChange($event: any): void {
        console.log('onChange');
        // this.log += new Date() + "<br />";
    }

    onPaste($event: any): void {
        console.log('onPaste');
        // this.log += new Date() + "<br />";
    }

    sendTestEmail() {

        if (this.email.valid) {
            console.log('Sending Test SMS');
            const dialogRef = this.dialog.open(PopinfoComponent, {
                data: {
                    icon: 'warning',
                    title: 'Action required',
                    message: 'Are you sure you want to send this message to yourself?',
                }
            });

            dialogRef.afterClosed().subscribe(res => {
                if (res === true) {
                    const dialogRefLoader = this.dialog.open(LoaderComponent, {
                        disableClose: true,
                    });

                    this.emailService.sendMeTestMessage({subject: this.subject.value, message: this.message.value}).subscribe(
                        response => {
                            if (response.isExecuted) {

                                const dialogRef2 = this.dialog.open(PopinfoComponent, {
                                    data: {
                                        icon: 'email',
                                        title: 'Email Sent!',
                                        message: 'The email you have typed has been sent to your inbox.',
                                    }
                                });
                            }
                        },
                        err => {
                            const dialogRef2 = this.dialog.open(PopinfoComponent, {
                                data: {
                                    icon: 'error',
                                    title: 'Sending Failed!',
                                    message: 'An error occured. We were unable to send your email.',
                                }
                            });

                        },
                        () => {
                            dialogRefLoader.close();
                        }

                    );
                }
            });

            // console.log('Sending Test Email');
            // this.emailService.sendTestEmail(this.subject.value, this.message.value)
            //     .subscribe(res => {
            //         console.log(res);
            //     });
        } else {
            const dialogRef2 = this.dialog.open(PopinfoComponent, {
                data: {
                    icon: 'error',
                    title: 'Sending Failed!',
                    message: 'Cannot send invalid content.',
                }
            });
            console.log('Cannot send invalid content');
        }

    }

}
