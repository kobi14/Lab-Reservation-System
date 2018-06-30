import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-labview',
  templateUrl: './labview.component.html',
  styleUrls: ['./labview.component.css']
})
export class LabviewComponent implements OnInit {
  reserve: Object[];

  labA8 = false;
  labA10 = false;
  labA12 = false;
  labA2 = false;
  labA4 = false;


  labB8 = false;
  labB10 = false;
  labB12 = false;
  labB2 = false;
  labB4 = false;


  labC8 = false;
  labC10 = false;
  labC12 = false;
  labC2 = false;
  labC4 = false;






  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getReserve().subscribe((data: Object[]) => {
      this.reserve = data;
      // console.log(data);
      for (let i of data) {
        switch (i['labd'][0]['lab']) {
          case ('Lab A'): {
            switch (i['labd'][0]['timed'][0]['time']) {
              case ('8-10'): {
                this.labA8 = true;
                break;
              }
              case ('10-12'): {
                this.labA10 = true;
                break;
              }
              case ('12-2'): {
                this.labA12 = true;
                break;
              }
              case ('2-4'): {
                this.labA2 = true;
                break;
              }
              case ('4-6'): {
                this.labA4 = true;
                break;
              }
            }
            break;
          }
          case ('Lab B'): {
            switch (i['labd'][0]['timed'][0]['time']) {
              case ('8-10'): {
                this.labB8 = true;
                break;
              }
              case ('10-12'): {
                this.labB10 = true;
                break;
              }
              case ('12-2'): {
                this.labB12 = true;
                break;
              }
              case ('2-4'): {
                this.labB2 = true;
                break;
              }
              case ('4-6'): {
                this.labB4 = true;
                break;
              }
            }
            break;
          }
          case ('Lab C'): {
            switch (i['labd'][0]['timed'][0]['time']) {
              case ('8-10'): {
                this.labC8 = true;
                break;
              }
              case ('10-12'): {
                this.labC10 = true;
                break;
              }
              case ('12-2'): {
                this.labC12 = true;
                break;
              }
              case ('2-4'): {
                this.labC2 = true;
                break;
              }
              case ('4-6'): {
                this.labC4 = true;
                break;
              }
            }
          }



        }
        console.log(i['labd'][0]['lab']);
        console.log(i['labd'][0]['timed'][0]['time']);
        console.log(i['labd'][0]['timed'][0]);
      }

    },
      err => {
        console.log(err);
        return false;
      });

  }

}
