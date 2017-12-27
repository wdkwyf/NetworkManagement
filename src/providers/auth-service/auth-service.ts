import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {isUndefined} from "ionic-angular/util/util";
import {NativeStorage} from "@ionic-native/native-storage";
import {AppConfig} from "../../app/app.config";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  private readonly getSomeUserURL: string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/User/?User.name=';
  private readonly postSomeUserURL: string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/User/';
  // private readonly postUserInfoURL: string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Userinfo/';
  private readonly userInfoURL: string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Userinfo/';
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
            AppConfig.setUsername(credentials.name);
            // this.http.get(this.userInfoURL+"?Userinfo.include.name=" + credentials.name).subscribe(data=>{
            //   AppConfig.setUserInfo(data['Userinfo'][0]);
            // })
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
        console.log(new Date().getTime());
        // user name is not reduplicated
        if (isUndefined(data['User'])) {
          let body = {
            'name': credentials.name,
            'password': credentials.password,
            'email': credentials.email,
            'createtime': new Date().getTime(),
            'cardid': '1',
            'flag': 1,
            'reason': ''
          };
          this.http.post(this.postSomeUserURL, body).subscribe(data => {
            let jsonData = {
              // 'phone':'',
              // 'workplace':'',
              // 'occupation':'',
              // 'job':'',
              'influence':0,
              'hasAvatar':0,
              // 'organization':'',
              // 'university':'',
              // 'qq':'',
              // 'wechat':'',
              // 'weibo':'',
              'include':{
                'id':data['id']
              },
            };
            this.http.post(this.userInfoURL,jsonData).subscribe(result=>{
              observer.next(true);
              observer.complete();
              console.log(data);
            })
          });
        } else {
          observer.next(false);
          observer.complete();
        }
      });
    });

  }

  public getUserInfoByName(name){
    return Observable.create(observer=>{
      this.http.get(this.userInfoURL +"?Userinfo.include.name=" + name).subscribe(data=>{
        let userInfo = data['Userinfo']?data['Userinfo'][0]:null;
        observer.next(userInfo);
        observer.complete();
      })
    })
  }


  public getUserInfoByNameLike(name){
    return Observable.create(observer=>{
      this.http.get(this.userInfoURL +"?Userinfo.include.name=(like)" + name).subscribe(data=>{
        let userInfo = data['Userinfo']?data['Userinfo']:[];
        observer.next(userInfo);
        observer.complete();
      })
    })
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
      }, () => {
        observer.next(this.unlogin);
        observer.complete();
      })
    });
  }

  public getUserInfo(){
    return Observable.create(observer=>{

    })
  }

  updateUserInfo(user,avatar) {
    return Observable.create(observer => {
      if(avatar){
        user['hasavatar'] = 1;
      }
      this.http.put(this.userInfoURL+user.id,user).subscribe(data=>{
        if(avatar){
          const fileTransfer: FileTransferObject = this.transfer.create();
          fileTransfer.upload(avatar,this.userInfoURL+user.id).then(response=>{
            console.log(response.response);
            observer.next(true);
            observer.complete();
          });
        }else{
          observer.next(true);
          observer.complete();
        }
      });
    })
  }

  constructor(private transfer: FileTransfer,public http: HttpClient, private nativeStorage: NativeStorage) {
    console.log('Hello AuthServiceProvider Provider');
  }

}
