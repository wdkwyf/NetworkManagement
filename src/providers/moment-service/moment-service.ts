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
  private readonly likeMomentURL:string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Likemoment/';

  constructor(private transfer: FileTransfer,public http: HttpClient) {
    console.log('Hello MomentServiceProvider Provider');
  }

  addLikeMoment(userInfoId,momentId){
    return Observable.create(observer=>{
      let body = {
        'user':{
          'id':userInfoId
        },
        'moment':{
          'id':momentId
        },
        'liketime':new Date().toLocaleString()
      };
      this.http.post(this.likeMomentURL,body).subscribe(data=>{
          observer.next(true);
          observer.complete();
      })
    })
  }

  cancelLikeMoment(userInfoId,momentId){
    return Observable.create(observer=>{
      this.http.get(this.likeMomentURL+'?Likemoment.user.id='+userInfoId+"&&Likemoment.moment.id="+momentId).subscribe(data=>{
          let likeMomentId = data['Likemoment'][0]['id'];
          this.http.delete(this.likeMomentURL+likeMomentId).subscribe(data=>{
            observer.next(true);
            observer.complete();
          })
      })
    })
  }

  likeOrNot(userInfoId,momentId){
    return Observable.create(observer=>{
      let like = false;
      this.http.get(this.likeMomentURL+'?Likemoment.user.id='+userInfoId+"&&Likemoment.moment.id="+momentId).subscribe(data=>{
        if(data['Likemoment'])
          like = true;
        observer.next(like);
        observer.complete();
      })
    })
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
      moment[key] = value;
      this.http.put(this.momentURL+moment.id,moment).subscribe(data=>{})
      observer.next();
      observer.complete();
    })
  }

}
