import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the MomentServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MomentServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MomentServiceProvider Provider');
  }

  getMomentList() {
    return Observable.create(observer => {
      let posts = [
        {
          id: 1, user: {id: '1', name: 'anna'},
          title:'title1',
          content: 'first',
          likeNum: 5,
          commentNum: 10,
          postTime: '2017-10-12 08:00',
          // comments:[{id:1,content:'hhh',commenter:{id:1,name:'anna',avatar:'../assets/imgs/avatar.jpg'},subComments:[{id:2,content:'ooo',commenter:{id:2,name:'ann'},subComments:[]}]}]
          comments: [{
            id: 1,
            level_num: 0,
            target_level_num: -1,
            target_user: null,
            content: 'hhh',
            commenter: {id: 1, name: 'anna', avatar: '../assets/imgs/avatar.jpg'}
          }, {
            id: 2,
            level_num: 1,
            target_level_num: 0,
            target_user: {id: 1, name: 'anna'},
            content: 'ooo',
            commenter: {id: 2, name: 'ann'}
          }]
        }, {
          id: 2, user: {id: '1', name: 'anna'},
          title:'title2',
          content: 'second',
          likeNum: 5,
          commentNum: 10,
          postTime: '2017-10-12 08:00',
          comments: [{
            id: 1,
            level_num: 0,
            target_level_num: -1,
            target_user: null,
            content: 'hhh',
            commenter: {id: 1, name: 'anna', avatar: '../assets/imgs/avatar.jpg'}
          }, {
            id: 2,
            level_num: 1,
            target_level_num: 0,
            target_user: {id: 1, name: 'anna'},
            content: 'ooo',
            commenter: {id: 2, name: 'ann', avatar: '../assets/imgs/avatar.jpg'}
          }]
        }];
      observer.next(posts);
      observer.complete();
    })

  }

  postMoment() {
    return Observable.create(observer => {
      let post = {
        id:3,
        user: {id: '1', name: 'anna'},
        title:'title1',
        content: 'first',
        likeNum: 0,
        commentNum: 0,
        postTime: '2017-10-12 08:00',
        comments: [{
          id: 1,
          level_num: 0,
          target_level_num: -1,
          target_user: null,
          content: 'hhh',
          commenter: {id: 1, name: 'anna', avatar: '../assets/imgs/avatar.jpg'}
        }]
      };
      observer.next(post);
      observer.complete();
    })
  }

  updateMoment(moment,key,value){
    return Observable.create(observer=>{
      observer.next();
      observer.complete();
    })

  }

}
