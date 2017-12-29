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

  private readonly postURL:string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Posts/';
  private readonly likePostURL:string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Likepost/';
  private readonly commentURL:string = 'http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Comments/';

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
      this.http.post(this.likePostURL,body).subscribe(data=>{
          observer.next(true);
          observer.complete();
      })
    })
  }

  cancelLikeMoment(userInfoId,momentId){
    return Observable.create(observer=>{
      this.http.get(this.likePostURL+'?Likepost.user.id='+userInfoId+"&&Likepost.moment.id="+momentId).subscribe(data=>{
          let likeMomentId = data['Likepost'][0]['id'];
          this.http.delete(this.likePostURL+likeMomentId).subscribe(data=>{
            observer.next(true);
            observer.complete();
          })
      })
    })
  }

  likeOrNot(userInfoId,momentId){
    return Observable.create(observer=>{
      let like = false;
      this.http.get(this.likePostURL+'?Likepost.user.id='+userInfoId+"&&Likepost.moment.id="+momentId).subscribe(data=>{
        if(data['Likepost'])
          like = true;
        observer.next(like);
        observer.complete();
      })
    })
  }

  getMomentList(){
    return Observable.create(observer => {
      this.http.get(this.postURL).subscribe(data=>{
        let moments = [];
        if(data['Posts']){
          moments = data['Posts'];
        }
        observer.next(moments);
        observer.complete();
      })
    })
  }

  getMomentListByName(name) {
    return Observable.create(observer => {
      // let posts;
      this.http.get(this.postURL+"?Posts.user.include.name="+name).subscribe(data=>{
        let posts = data['Posts'];
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
        "posttime": new Date().getTime(),
      };
      json['haspic'] = img?1:0;
      this.http.post(this.postURL,json).subscribe(data=>{
        console.log(data);
        if(img) {
          const fileTransfer: FileTransferObject = this.transfer.create();
          fileTransfer.upload(img, this.postURL + data['id']).then(response => {
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
      console.log(moment);
      this.http.put(this.postURL+moment.id,moment).subscribe(data=>{
        console.log(data);
        observer.next(data);
        observer.complete();
      })

    })
  }

  postComment(content,parentcommentId,userInfoId,targetUserInfo){
    return Observable.create(observer=>{
      let body = {
        'content':content,
        'parentcomment':parentcommentId,
        'commenttime':new Date().getTime(),
        'commenter':{
          'id':userInfoId,
        },
      };
      if(targetUserInfo){
        body['targetuser'] = targetUserInfo;
      }
      this.http.post(this.commentURL,body).subscribe(data=>{
          console.log(data);
          observer.next(data);
          observer.complete();

      })
    })
  }
}
