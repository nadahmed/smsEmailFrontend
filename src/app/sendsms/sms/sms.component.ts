import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

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

  constructor() {

    this.message = new FormControl('',
    [
        Validators.required,
        Validators.maxLength(255),
      ]);

    this.sms.addControl('message', this.message);

    
    this.subscription = this.sms.valueChanges.subscribe(() => {
        this.smsChangeEvent.emit(this.sms);
      });
// this.message.setValue('');
//     this.message.setValue(
// `আমার সোনার বাংলা
// আমি তোমায় ভালবাসি
// চিরদিন তোমার আকাশ
// চিরদিন তোমার আকাশ
// তোমার বাতাস আমার প্রাণে
// ও মা
// আমার প্রাণে বাজায় বাঁশি
// সোনার বাংলা
// আমি তোমায় ভালবাসি`
// );

    }

  ngOnInit() {
    this.smsChangeEvent.emit(this.sms);
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
