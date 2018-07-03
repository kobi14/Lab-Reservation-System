import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;


  userRole = [
    { id: 0, name: 'Select' },
    { id: 1, name: 'User' },
    { id: 2, name: 'Admin' }

  ];
  userrole = 0;

  constructor(
    private authService: AuthService,
    private flashmsg: FlashMessagesService,
    private router: Router,
    private validateService: ValidateService,
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    // console.log(this.username);
    const user = {
      username: this.username,
      password: this.password

    };
    
    if (this.username == undefined || this.password == undefined || this.userrole === 0) {
      alert('Fill all the fields');

    } else if (this.userrole == 1) {


      // if (!this.validateService.validateReservation(user)) {
      //   this.flashmsg.show('Fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      //   return false;
      // }




      this.authService.authenticateUser(user).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user, data.role);
          this.flashmsg.show('You are now logged in', { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/']);
        } else {
          this.flashmsg.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
          this.router.navigate(['login']);
        }
      });


    } else if (this.userrole == 2) {

      this.authService.authenticateAdmin(user).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user, data.role);
          this.flashmsg.show('You are now logged in', { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['']);
        } else {
          this.flashmsg.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
          this.router.navigate(['login']);
        }
      });



    }


  }

}
