import { Carrier, SendingService } from 'src/app/api/sending.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { PopinfoComponent } from '../extras/popinfo/popinfo.component';
import { LoaderComponent } from '../extras/loader/loader.component';
import { BulkSendingRequestBody } from '../api/api-service.interface';

export interface InputData {
  id: number;
  cost: string;
}

@Component({
  selector: 'app-sendsms',
  templateUrl: './sendsms.component.html',
  styleUrls: ['./sendsms.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class SendsmsComponent implements OnInit {
  data: InputData[] = [];

  formIndex: FormGroup[] = [];

  formArray = new FormArray([]);

  smsForm = new FormGroup({});

  totalCost = '';

  details = {
    group: this.formArray,
    message: this.smsForm,
    cost: this.data,
    totalCost: this.totalCost,
  };

  myIndex = 0;

  totalQuantity: number;
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { name: 'total', cols: 8, rows: 2 },
          { name: 'quantity', cols: 8, rows: 1 },
          { name: 'amount', cols: 8, rows: 1 },
        ];
      }

      return [
        { name: 'total', cols: 10, rows: 1 },
        { name: 'quantity', cols: 3, rows: 1 },
        { name: 'amount', cols: 3, rows: 1 },
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private smsService: SendingService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.smsService.carrier = Carrier.Sms;
    this.formIndex.push(new FormGroup({}));
  }

  addForm() {
    // if (this.formArray.length < 10 ) {
    //     this.formArray.push(new FormGroup({}));
    // }
    if (this.formIndex.length < 10) {
      this.formIndex.push(new FormGroup({}));
    }
  }

  removeForm(index) {
    // this.formArray.removeAt(index);
    // const index = this.formIndex.indexOf(i);
    console.log(index);
    if (index > -1) {
      this.formIndex.splice(index, 1);
    }

    if (this.formIndex.length <= 0) {
      this.addForm();
    }
  }

  myEvents(i, value) {
    // console.log('[CHANGED]', i, value);
    this.updateTotals(i, value);
  }

  private updateTotals(i, value) {
    this.data[i] = { id: i, cost: value.cost };
    let cost = 0.0;
    this.data.forEach((val) => {
      cost = cost + parseFloat(val.cost);
      // console.log(val.cost);
    });
    this.totalCost = cost.toFixed(2);

    let quan = 0;
    this.formArray.controls.forEach((val) => {
      if (val.valid) {
        // console.log(val.value.quantity);
        quan = quan + val.value.quantity;
      }
    });

    this.totalQuantity = quan;
  }

  deletedEvent(i, value) {
    // console.log('[DELETED]', i, value);
    this.formArray.removeAt(i);
    this.updateTotals(i, { cost: '0.00' });
    this.data.splice(i, 1);
  }

  createdEvent(i, value) {
    // console.log('[CREATED]', i, value);
    this.formArray.push(value.group);
    this.data.push(value.cost);
    this.updateTotals(i, { cost: '0.00' });

    // this.formArray.setControl(i, value.group);
    // this.formArray.insert(value.index, value.group);
  }

  messageEvents(form) {
    this.smsForm = form;
  }

  formComplete() {
    this.details = {
      group: this.formArray,
      cost: this.data,
      totalCost: this.totalCost,
      message: this.smsForm,
    };
  }

  sendToAll() {
    if (this.smsForm.invalid || this.formArray.invalid) {
      return;
    } else {
      const data: BulkSendingRequestBody = {
        groups: [],
        ...this.smsForm.value,
        bill: this.totalCost,
      };

      for (const formgroup of this.formArray.controls) {
        data.groups.push({
          type: formgroup.value.groupName.type.toLowerCase(),
          category: formgroup.value.groupName.groupName,
          qty: formgroup.value.quantity,
        });
      }
      console.log(data);
      const dialogRef = this.dialog.open(PopinfoComponent, {
        data: {
            icon: 'warning',
            title: 'Warning! Irreversible action!',
            // tslint:disable-next-line: max-line-length
            message: `This action will send an sms to ALL your selected reciepients and is irreversible. Click Cancel to abort or OK to continue.`,
        }
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res === true) {
            const dialogRefLoader = this.dialog.open(LoaderComponent, {
                disableClose: true,
            });

            this.smsService.sendBulkMessage(data).subscribe(
                response => {
                    if (response.isExecuted) {

                        const dialogRef2 = this.dialog.open(PopinfoComponent, {
                            data: {
                                icon: 'textsms',
                                title: 'Message Sent!',
                                message: 'The message you have typed has been sent to your selected reciepients.',
                            }
                        });

                        dialogRef2.afterClosed().subscribe( _ => {
                          location.reload();
                        });
                    }
                },
                _ => {
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
      // this.sms.sendBulkSMS(data).subscribe((res) => {
      //   console.log(res);
      // });
    }
  }
}
