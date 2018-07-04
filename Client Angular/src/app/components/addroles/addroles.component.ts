
import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addroles',
  templateUrl: './addroles.component.html',
  styleUrls: ['./addroles.component.css']
})
export class AddrolesComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;
  role: String;

  userRole = [
    { id: 0, name: 'Select' },
    { id: 1, name: 'User' },
    { id: 2, name: 'Admin' }

  ];
  userrole = 0;


  constructor(private validateService: ValidateService,
    private flashmsg: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,

    };
    // REquire Field
    if (!this.validateService.validateRegister(user)) {
      // console.log("Fill all the fields");
      this.flashmsg.show('Fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;

    }
    // check email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashmsg.show('Enter Vaild Email ', { cssClass: 'alert-danger', timeout: 3000 });
      // console.log("email in correct");
      return false;

    }
    // Register user
    if (this.userrole == 1) {

      this.authService.registerUser(user).subscribe(data => {
        if (data.success) {
          this.flashmsg.show('He/She is now registered and can now login', { cssClass: 'alert-success', timeout: 8000 });
          this.router.navigate(['/dash']);
        } else {
          this.flashmsg.show('Something went wrong', { cssClass: 'alert-danger', timeout: 8000 });
          this.router.navigate(['/register']);
        }
      });

    } else if (this.userrole == 2) {

      const user2 = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        role: 'admin'

      };

      this.authService.registerAdmin(user2).subscribe(data => {
        if (data.success) {
          this.flashmsg.show('You are now registered and can now login', { cssClass: 'alert-success', timeout: 8000 });
          this.router.navigate(['/dash']);
        } else {
          this.flashmsg.show('Something went wrong', { cssClass: 'alert-danger', timeout: 8000 });
          this.router.navigate(['/register']);
        }
      });


    } else {
      alert('Select the role');
    }


  }

}
