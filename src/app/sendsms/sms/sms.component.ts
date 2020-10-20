import { Carrier, SendingService } from 'src/app/api/sending.service';
import { AuthService } from 'src/app/api/auth/auth.service';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PopinfoComponent } from 'src/app/extras/popinfo/popinfo.component';
import { LoaderComponent } from 'src/app/extras/loader/loader.component';

@Component({
    selector: 'app-sms',
    templateUrl: './sms.component.html',
    styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit, OnDestroy {

    @Output() smsChangeEvent = new EventEmitter<any>();

    message = new FormControl('',
        [
            Validators.required,
            Validators.maxLength(160),
        ]);

    sms = new FormGroup({
        message: this.message
    });

    private subscription: Subscription;

    constructor(
        private smsService: SendingService,
        public dialog: MatDialog,
        private auth: AuthService,
    ) { }

    ngOnInit() {
        this.smsService.carrier = Carrier.Sms;
        this.subscription = this.sms.valueChanges.subscribe(() => {
            this.smsChangeEvent.emit(this.sms);
        });
        this.message.setValue(
            `আমার সোনার বাংলা
আমি তোমায় ভালবাসি`
        );


        this.smsChangeEvent.emit(this.sms);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    sendTestSms() {
        if (this.sms.valid) {
            console.log('Sending Test SMS');
            const dialogRef = this.dialog.open(PopinfoComponent, {
                data: {
                    icon: 'warning',
                    title: 'Warning!',
                    message: 'This sms will cost you ৳' + this.auth.user.smsUnitCost + '. Would you like to continue?',
                }
            });

            dialogRef.afterClosed().subscribe(res => {
                if (res === true) {
                    const dialogRefLoader = this.dialog.open(LoaderComponent, {
                        disableClose: true,
                    });

                    this.smsService.sendMeTestMessage(this.message.value).subscribe(
                        response => {
                            if (response.isExecuted) {

                                const dialogRef2 = this.dialog.open(PopinfoComponent, {
                                    data: {
                                        icon: 'textsms',
                                        title: 'Message Sent!',
                                        message: 'The message you have typed has been sent to your cellphone.',
                                    }
                                });
                            }
                        },
                        err => {
                            const dialogRef2 = this.dialog.open(PopinfoComponent, {
                                data: {
                                    icon: 'error',
                                    title: 'Sending Failed!',
                                    message: 'An error occured. We were unable to send your text.',
                                }
                            });

                        },
                        () => {
                            dialogRefLoader.close();
                        }

                    );
                }
            });
        }
    }

}
