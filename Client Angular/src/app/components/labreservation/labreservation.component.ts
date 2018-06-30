import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';

import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-labreservation',
  templateUrl: './labreservation.component.html',
  styleUrls: ['./labreservation.component.css']
})
export class LabreservationComponent implements OnInit {
  user: Object;
  username: String;
  labname: String;
  date: Date;
  reserved: Boolean;


  Labname = [
    { id: 0, name: 'Select', value: 'kk' },
    { id: 1, name: 'Lab A', value: 'Lab A' },
    { id: 2, name: 'Lab B', value: 'Lab B' },
    { id: 3, name: 'Lab C', value: 'Lab C' }


  ];
  labno = 0;


  selectedTimeOption = [];

  timeOptions = [
    { name: '8AM-10AM', value: '8-10', checked: false },
    { name: '10AM-12PM', value: '10-12', checked: false },
    { name: '12PM-2PM', value: '12-2', checked: false },
    { name: '2PM-4PM', value: '2-4', checked: false },
    { name: '4PM-6PM', value: '4-6', checked: false },
  ];






  constructor(
    private authService: AuthService,
    private flashmsg: FlashMessagesService,
    private router: Router,
    private validateService: ValidateService
  ) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      console.log(this.user['username']);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  onReserve() {

    if (this.labno == 1) {
      this.labname = 'Lab A';
    } else if (this.labno == 2) {
      this.labname = 'Lab B';
    } else if (this.labno == 3) {
      this.labname = 'Lab C';
    }




    this.selectedTimeOption = [];
    for (let i = 0; i < this.timeOptions.length; i++) {
      if (this.timeOptions[i].checked) {
        this.selectedTimeOption.push(this.timeOptions[i]['value']);
      }

    }

    if (this.selectedTimeOption !== []) {
      if (this.labname === undefined || this.date === undefined) {
        // this.flashmsg.show('Fill in all the fields/Something went wrong', { cssClass: 'alert-danger', timeout: 8000 });
        alert('Fill in all the fields/Something went wrong');
      }
      if (!this.validateService.validateReservationdate(this.date)) {
        alert('Enter Vaild Date');
      }
      for (let j of this.selectedTimeOption) {
        console.log(j);
        const reserve = {
          date: this.date,
          labd: {
            lab: this.labname,
            timed: {
              time: j,
              reservation: {
                reserved: true,
                username: this.user['username']
              }
            }

          }

        }

        if (!this.validateService.validateReservation(reserve)) {
          // console.log(this.timein);
          // console.log("Fill all the fields");
          this.flashmsg.show('Fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });




          return false;


        }

        if (!this.validateService.validateReservationdate(this.date)) {
          this.flashmsg.show('Enter Vaild Date ', { cssClass: 'alert-danger', timeout: 3000 });
          alert('Enter Vaild Date');
          return false;


        }
        // Register user
        this.authService.addReservation(reserve).subscribe(data => {
          if (data.success) {
            this.flashmsg.show('You are now registered and can now login', { cssClass: 'alert-success', timeout: 8000 });
            // this.router.navigate(['/login']);
          } else {
            this.flashmsg.show('Something went wrong', { cssClass: 'alert-danger', timeout: 8000 });
            // this.router.navigate(['/register']);
          }
        });



      }


    }



    // console.log(this.selectedTimeOption);

    // if(!this.validateService.validateReservationtime(reserve.timein,reserve.timeout)){
    //   this.flashmsg.show('Enter Vaild Time-in and Time-out ',{cssClass:'alert-danger',timeout:3000});
    //   //console.log(this.TimeIn);
    //  // console.log(123);
    //   return false;


    // }




  }

}
