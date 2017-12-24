import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the ContactServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ContactServiceProvider Provider');
  }

  getUserInfoByName(username){
    return Observable.create(observer=>{
      let userInfo = {
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
        'include': {'name': 'anna', 'email': 'huanganna@sjtu.edu.cn'},
        'hasGroups': [{'id':1,'name':'同学','count':10},{'id':2,'name':'同事','count':30}]
      };
      observer.next(userInfo);
      observer.complete();
    })

  }

  areContacts(name1,name2){
    return true;
  }

  findUserInfoByUsername(username){
    return {
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
      'avatar':'./assets/imgs/user.jpg',
      'include': {'id': 2, 'name': 'haha','email':'593880978@qq.com'}
    };
  }

  updateUserInfo(user){
    return Observable.create(observer=>{
      observer.next();
      observer.complete();
    })

  }

}
