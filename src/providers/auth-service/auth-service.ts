import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {isUndefined} from "ionic-angular/util/util";
import {NativeStorage} from "@ionic-native/native-storage";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  private readonly getSomeUserURL: string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/User/?User.name=';
  private readonly postSomeUserURL: string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/User/';
  private readonly s_username: string = 'userName';
  public readonly unlogin = 'Guest';

  public login(credentials) {
    if (credentials.name === null || credentials.password === null) {
      return Observable.throw('Please insert credentials');
    } else {
      return Observable.create(observer => {
        this.http.get(this.getSomeUserURL + credentials.name).subscribe(data => {
          let access = credentials.password === data['User'][0]['password'];
          if (access) {
            this.nativeStorage.setItem(this.s_username, credentials.name).then(() => {
              console.log('stored item:', credentials.name);
            });
          }
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

  public logout() {
    return Observable.create(observer => {
      this.nativeStorage.remove(this.s_username).then(() => {
        console.log('remove item: username');
      });
      observer.next(true);
      observer.complete();
    });
  }

  public getUserName() {
    return Observable.create(observer => {
      this.nativeStorage.getItem(this.s_username).then(value => {
        console.log('success');
        observer.next(value);
        observer.complete();
      }, ()=> {
        observer.next(this.unlogin);
        observer.complete();
      })
    });
  }

  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
    console.log('Hello AuthServiceProvider Provider');
  }

}
