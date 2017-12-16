import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {isUndefined} from "ionic-angular/util/util";

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  currentUser: User;
  private getSomeUserURL: string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/User/?User.name=';
  private postSomeUserURL: string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/User/';

  public login(credentials) {
    if (credentials.name === null || credentials.password === null) {
      return Observable.throw('Please insert credentials');
    } else {
      return Observable.create(observer => {
        this.http.get(this.getSomeUserURL + credentials.name).subscribe(data => {
          console.log('data'+data);
          let access = credentials.password === data['User'][0]['password'];
          this.currentUser = new User(credentials.name, credentials.email);
          observer.next(access);
          observer.complete();
        })
      })
    }
  }

  public register(credentials) {
    return Observable.create(observer => {
      this.http.get(this.getSomeUserURL + credentials.name).subscribe(data => {
        // user name is not reduplicated
        if (isUndefined(data['User'])) {
          let body = {
            'name': credentials.name,
            'password': credentials.password,
            'email': credentials.email
          };
          this.http.post(this.postSomeUserURL, body).subscribe(data => {
            console.log(data);
          });
        }
      });
      observer.next(false);
      observer.complete();
    });

  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }


  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

}
