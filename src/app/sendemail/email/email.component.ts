import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { EmailService } from 'src/app/api/email/email.service';


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
    log: string = '';
    @ViewChild('myckeditor', {static: false}) ckeditor: any;

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
      'subject': this.subject,
      'message': this.message,
    });

    private subscription: Subscription;

  constructor(private emailService: EmailService) {}

  ngOnInit() {

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
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }

  onPaste($event: any): void {
    console.log("onPaste");
    //this.log += new Date() + "<br />";
  }

  sendTestEmail(){

    if (this.email.valid){
      console.log('Sending Test Email');
      this.emailService.sendTestEmail(this.subject.value, this.message.value)
      .subscribe( res => {
        console.log(res);
      });
    } else {
      console.log("Cannot send invalid content");
    }

  }

}
