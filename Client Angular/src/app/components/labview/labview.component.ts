import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import * as jsPDF from 'jspdf';




@Component({
  selector: 'app-labview',
  templateUrl: './labview.component.html',
  styleUrls: ['./labview.component.css']
})
export class LabviewComponent implements OnInit {
  reserve: Object[];
  day:String;

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

  }


  onSearchChange(searchValue: Date) {
    console.log(searchValue);
    this.labA8 = false;
    this.labA10 = false;
    this.labA12 = false;
    this.labA2 = false;
    this.labA4 = false;


    this.labB8 = false;
    this.labB10 = false;
    this.labB12 = false;
    this.labB2 = false;
    this.labB4 = false;


    this.labC8 = false;
    this.labC10 = false;
    this.labC12 = false;
    this.labC2 = false;
    this.labC4 = false;

    this.authService.getReserve(searchValue).subscribe((data: Object[]) => {
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


  exportAction() {


    const specialElementHandlers = {
      // element with id of "bypass" - jQuery style selector
      '.no-export': function(element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true;
      }
    };
    const doc = new jsPDF('p', 'pt', 'a4');
 
  
  const source = document.getElementById('exportthis').innerHTML;

  const margins = {
    top: 10,
    bottom: 10,
    left: 10,
    width: 595
  };

  doc.fromHTML(
    source, // HTML string or DOM elem ref.
    margins.left,
    margins.top, {
      'width': margins.width,
      //'elementHandlers': specialElementHandlers
    },
    function(dispose) {
      doc.save('Test.pdf');
    }, margins);


  }
}















