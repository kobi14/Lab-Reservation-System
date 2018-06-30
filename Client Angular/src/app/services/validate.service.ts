import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateReservation(reserve) {



    if (reserve.labd.lab == undefined || reserve.date == undefined) {
      return false;
    } else {
      return true;
    }

  }
  validateReservationdate(FromDate) {
    const date = new Date();
    if (FromDate > date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)) {
      return true;
    } else {
      return false;
    }


  }
  validateReservationtime(tin, tout) {

    if (tin < tout) {

      return true;

    } else {
      return false;
    }


  }

}
