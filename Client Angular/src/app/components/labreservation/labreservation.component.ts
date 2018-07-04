import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';

import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';

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
  reserve: Object;

  x8 = false;
  x12 = false;
  x10 = false;
  x2 = false;
  x4 = false;



  Labname = [
    { id: 0, name: 'Select', value: 'kk' },
    { id: 1, name: 'Lab A', value: 'Lab A' },
    { id: 2, name: 'Lab B', value: 'Lab B' },
    { id: 3, name: 'Lab C', value: 'Lab C' }


  ];
  labno = 0;


  selectedTimeOption = [];

  timeOptions = [
    { name: '8AM-10AM', value: '8-10', checked: false, disable: this.x8 },
    { name: '10AM-12PM', value: '10-12', checked: false, disable: this.x12 },
    { name: '12PM-2PM', value: '12-2', checked: false, disable: this.x10 },
    { name: '2PM-4PM', value: '2-4', checked: false, disable: this.x2 },
    { name: '4PM-6PM', value: '4-6', checked: false, disable: this.x4 },
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

  onChange(ok) {
    this.date = null;
  }

  onSearchChange(search: Date) {

    this.x8 = false;
    this.x12 = false;
    this.x10 = false;
    this.x2 = false;
    this.x4 = false;

    this.selectedTimeOption = [];

    this.timeOptions = [
      { name: '8AM-10AM', value: '8-10', checked: false, disable: this.x8 },
      { name: '10AM-12PM', value: '10-12', checked: false, disable: this.x10 },
      { name: '12PM-2PM', value: '12-2', checked: false, disable: this.x12 },
      { name: '2PM-4PM', value: '2-4', checked: false, disable: this.x2 },
      { name: '4PM-6PM', value: '4-6', checked: false, disable: this.x4 },
    ];



    this.authService.getReserve(search).subscribe((data: Object[]) => {
      this.reserve = data;
      if (this.labno == 0) {
        alert('first pick the lab');
        return;
      }
      // console.log(data);
      for (let i of data) {

        if (this.labno == 1) {
          switch (i['labd'][0]['lab']) {
            case ('Lab A'): {
              switch (i['labd'][0]['timed'][0]['time']) {
                case ('8-10'): {
                  this.x8 = true;
                  break;
                }
                case ('10-12'): {
                  this.x10 = true;
                  break;
                }
                case ('12-2'): {
                  this.x12 = true;
                  break;
                }
                case ('2-4'): {
                  this.x2 = true;
                  break;
                }
                case ('4-6'): {
                  this.x4 = true;
                  break;
                }
              }
              break;
            }
          }
        } else if (this.labno == 2) {
          switch (i['labd'][0]['lab']) {
            case ('Lab B'): {
              switch (i['labd'][0]['timed'][0]['time']) {
                case ('8-10'): {
                  this.x8 = true;
                  break;
                }
                case ('10-12'): {
                  this.x10 = true;
                  break;
                }
                case ('12-2'): {
                  this.x12 = true;
                  break;
                }
                case ('2-4'): {
                  this.x2 = true;
                  break;
                }
                case ('4-6'): {
                  this.x4 = true;
                  break;
                }
              }
              break;
            }
          }

        } else if (this.labno == 3) {
          switch (i['labd'][0]['lab']) {
            case ('Lab C'): {
              switch (i['labd'][0]['timed'][0]['time']) {
                case ('8-10'): {
                  this.x8 = true;
                  break;
                }
                case ('10-12'): {
                  this.x10 = true;
                  break;
                }
                case ('12-2'): {
                  this.x12 = true;
                  break;
                }
                case ('2-4'): {
                  this.x2 = true;
                  break;
                }
                case ('4-6'): {
                  this.x4 = true;
                  break;
                }
              }
              break;
            }
          }

        }

        this.selectedTimeOption = [];

        this.timeOptions = [
          { name: '8AM-10AM', value: '8-10', checked: false, disable: this.x8 },
          { name: '10AM-12PM', value: '10-12', checked: false, disable: this.x10 },
          { name: '12PM-2PM', value: '12-2', checked: false, disable: this.x12 },
          { name: '2PM-4PM', value: '2-4', checked: false, disable: this.x2 },
          { name: '4PM-6PM', value: '4-6', checked: false, disable: this.x4 },
        ];


      }


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
