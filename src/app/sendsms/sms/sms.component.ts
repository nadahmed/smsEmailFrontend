import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SmsService } from 'src/app/api/sms/sms.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit, OnDestroy {

    @Output() smsChangeEvent = new EventEmitter<any>();

    sms = new FormGroup({});
    message: FormControl;

    private subscription: Subscription;

  constructor(
    private smsService: SmsService
  ) {

    this.message = new FormControl('',
    [
        Validators.required,
        Validators.maxLength(160),
      ]);

    this.sms.addControl('message', this.message);

    
    this.subscription = this.sms.valueChanges.subscribe(() => {
        this.smsChangeEvent.emit(this.sms);
      });
this.message.setValue('');
    this.message.setValue(
`আমার সোনার বাংলা
আমি তোমায় ভালবাসি`
);

    }

  ngOnInit() {
    this.smsChangeEvent.emit(this.sms);
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  sendTestSms() {
    console.log('Sending Test SMS');
    this.smsService.sendTestSms(this.message.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
