import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  name:String;
  username:String;
  email:String;
  password:String;
      

  constructor(private validateService: ValidateService,private flashmsg:FlashMessagesService,private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name:this.name,
      username:this.username,
      email:this.email,
      password:this.password

    }
    //REquire Field
    if(!this.validateService.validateRegister(user)){
      //console.log("Fill all the fields");
      this.flashmsg.show('Fill in all the fields',{cssClass:'alert-danger',timeout:3000});
      return false;

    }
    //check email
    if(!this.validateService.validateEmail(user.email)){
      this.flashmsg.show('Enter Vaild Email ',{cssClass:'alert-danger',timeout:3000});
      //console.log("email in correct");
      return false;

    }
       // Register user
       this.authService.registerUser(user).subscribe(data => {
        if(data.success) {
          this.flashmsg.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 8000});
          this.router.navigate(['/login']);
        } else {
          this.flashmsg.show('Something went wrong', {cssClass: 'alert-danger', timeout: 8000});
          this.router.navigate(['/register']);
        }
      });

  }

}
