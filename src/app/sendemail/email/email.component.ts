import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';


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

    email = new FormGroup({});
    message: FormControl;

    private subscription: Subscription;

  constructor() {
////////////////////////
    this.mycontent = `<p>My html content</p>`;
/////////////////////////
    this.message = new FormControl('',
    [
        Validators.required,
        Validators.maxLength(255),
      ]);

    this.email.addControl('message', this.message);

    this.subscription = this.email.valueChanges.subscribe(() => {
        this.emailChangeEvent.emit(this.email);
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
  
}
