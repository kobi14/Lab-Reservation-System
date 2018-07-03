import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  user: Object;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getProfileAdmin().subscribe(admin => {
      this.user = admin.user;
    },
      err => {
        console.log(err);
        return false;
      });


  }

}
