import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the GroupServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GroupServiceProvider Provider');
  }

  getContactsInGroup(groupId) {
    return Observable.create(observer => {
      let contacts = [{
        'phone': '15221530965',
        'workplace': '上海市 市辖区 杨浦区',
        'occupation': '学生',
        'job': 'IT/互联网 研发',
        'influence': 10,
        'organization': '上海交通大学',
        'university': '上海交通大学',
        'qq': '593880978',
        'wechat': 'anna',
        'weibo': '15221530965',
        'avatar': './assets/imgs/avatar.jpg',
        'include': {'id': 3, 'name': 'hhh', 'email': '593880978@qq.com'}
      }, {
        'phone': '15221530965',
        'workplace': '上海市 市辖区 杨浦区',
        'occupation': '学生',
        'job': 'IT/互联网 研发',
        'influence': 10,
        'organization': '上海交通大学',
        'university': '上海交通大学',
        'qq': '593880978',
        'wechat': 'anna',
        'weibo': '15221530965',
        'avatar': './assets/imgs/avatar.jpg',
        'include': {'id': 3, 'name': 'hhh', 'email': '593880978@qq.com'}
      }];
      observer.next(contacts);
      observer.complete();
    })
  }

  getInGroupOfUser(username){
    return Observable.create(observer =>{
      let groups = [{'id':1,'name':"同学",'count':10}];
      observer.next(groups);
      observer.complete();
    })
  }


  modifyInGroupList(inGroupIdList,contactName){
    return Observable.create(observer=>{
      for(let inGroupId of inGroupIdList){

      }
      observer.next();
      observer.complete();
    })
  }

  createGroup(userInfo,groupName) {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    })

  }

}
