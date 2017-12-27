import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";

/*
  Generated class for the MomentServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MomentServiceProvider {

  private readonly momentURL:string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Moments/';

  constructor(private transfer: FileTransfer,public http: HttpClient) {
    console.log('Hello MomentServiceProvider Provider');
  }

  getMomentList(){
    return Observable.create(observer => {
      this.http.get(this.momentURL).subscribe(data=>{
        let moments = data['Moments'];
        observer.next(moments);
        observer.complete();
      })
    })
  }

  getMomentListByName(name) {
    return Observable.create(observer => {
      // let posts;
      this.http.get(this.momentURL+"?Moments.user.include.name="+name).subscribe(data=>{
        let posts = data['Moment'];
        observer.next(posts);
        observer.complete();
      });
    })

  }

  postMoment(userInfoId,title,content,img) {
    return Observable.create(observer => {
      let json = {
        "user": {"id": userInfoId},
        "title":title,
        "content": content,
        "likenum": 0,
        "commentnum": 0,
        "posttime": new Date().toLocaleString(),
      };
      json['haspic'] = img?1:0;
      this.http.post(this.momentURL,json).subscribe(data=>{
        console.log(data);
        if(img) {
          const fileTransfer: FileTransferObject = this.transfer.create();
          fileTransfer.upload(img, this.momentURL + data['id']).then(response => {
            console.log(response.response);
            observer.next(data);
            observer.complete();
          });
        }else {
          observer.next(data);
          observer.complete();
        }
      });
    })
  }

  updateMoment(moment,key,value){
    return Observable.create(observer=>{
      observer.next();
      observer.complete();
    })

  }

}
