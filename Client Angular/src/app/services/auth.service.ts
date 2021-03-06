import { Injectable } from '@angular/core';



import { Http, Headers } from '@angular/http';

import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';




// import 'rxjs/Rx';
// import  'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  rolex: any;


  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers })
      .pipe(map(res => res.json()));
  }

  registerAdmin(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/register', user, { headers: headers })
      .pipe(map(res => res.json()));
  }

  addReservation(reserve) {
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/reserves/lab', reserve, { headers: headers })
      .pipe(map(res => res.json()));
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers })
      .pipe(map(res => res.json()));
  }

  authenticateAdmin(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/authenticate', user, { headers: headers })
      .pipe(map(res => res.json()));
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', { headers: headers })
      .pipe(map(res => res.json()));
  }
  getProfileAdmin() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/profile', { headers: headers })
      .pipe(map(res => res.json()));
  }
  getReserve(date: Date) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/reserves/view/' + date, { headers: headers })
      .pipe(map(res => res.json()));
  }
  storeUserData(token,  user, role) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
    this.rolex = role;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');

  }
  // loggedIn(admin) {
  //   if (localStorage.getItem('role') == admin) {
  //     return true;
  //   }

  // }
  isAdmin() {
    if (localStorage.getItem('role') === 'admin') {
      return true;
    }

  }

  logout() {
    this.authToken = null;
    this.user = null;
    this.rolex = null;
    localStorage.clear();
  }


}
