import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

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
  private getUserURL: string = "http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/User/?User.name=";

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw('Please insert credentials');
    } else {
      return Observable.create(observer => {
        this.http.get(this.getUserURL + credentials.email).subscribe(data => {
          let access = credentials.password === data['User'][0]['password'];
          this.currentUser = new User("name", credentials.email);
          observer.next(access);
          observer.complete();
        })
      })
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw('Please insert credentials');
    } else {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
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
