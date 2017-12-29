import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {debugOutputAstAsTypeScript} from "@angular/compiler";
import {AppConfig} from "../../app/app.config";

/*
  Generated class for the GroupServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupServiceProvider {

  private readonly joinGroupURL:string = "http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Ingroup/";
  private readonly groupURL:string = "http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Group/";
  private readonly userInfoURL:string = "http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Userinfo/";

  constructor(public http: HttpClient) {
    console.log('Hello GroupServiceProvider Provider');
  }

  //获得组的所有好友
  getContactsInGroup(groupId) {
    return Observable.create(observer => {
      console.log((groupId));
      this.http.get(this.joinGroupURL+"?Ingroup.group.id="+groupId).subscribe(data=>{
        console.log(data);
        let contacts = [];
        if(data["Ingroup"]){
          for(let joingroup of data["Ingroup"]){
            contacts.push(joingroup["user"]);
          }
        }
        observer.next(contacts);
        observer.complete();
      });

      // let contacts = [{
      //   'phone': '15221530965',
      //   'workplace': '上海市 市辖区 杨浦区',
      //   'occupation': '学生',
      //   'job': 'IT/互联网 研发',
      //   'influence': 10,
      //   'organization': '上海交通大学',
      //   'university': '上海交通大学',
      //   'qq': '593880978',
      //   'wechat': 'anna',
      //   'weibo': '15221530965',
      //   'avatar': './assets/imgs/avatar.jpg',
      //   'include': {'id': 3, 'name': 'hhh', 'email': '593880978@qq.com'}
      // }, {
      //   'phone': '15221530965',
      //   'workplace': '上海市 市辖区 杨浦区',
      //   'occupation': '学生',
      //   'job': 'IT/互联网 研发',
      //   'influence': 10,
      //   'organization': '上海交通大学',
      //   'university': '上海交通大学',
      //   'qq': '593880978',
      //   'wechat': 'anna',
      //   'weibo': '15221530965',
      //   'avatar': './assets/imgs/avatar.jpg',
      //   'include': {'id': 3, 'name': 'hhh', 'email': '593880978@qq.com'}
      // }];
      // observer.next(contacts);
      // observer.complete();
    })
  }

  //获得用户所在的组
  getInGroupOfUser(username){
    return Observable.create(observer =>{
      this.http.get(this.joinGroupURL+"?Ingroup.user.include.name="+username).subscribe(data=>{
        let groups = [];
        let joinGroups = [];
        if(data["Ingroup"]){
          // groups = [];
          joinGroups = data['Ingroup'];
          for(let joinGroup of data["Ingroup"]){
            groups.push(joinGroup['group']);
          }
        }
        //let groups = data["Joingroup"][0]["group"];
        observer.next({'groups':groups,'joinGroups':joinGroups});
        observer.complete();
      });
      // let groups = [{'id':1,'name':"同学",'count':1}];
      // observer.next(groups);
      // observer.complete();
    })
  }

  //将好友从某组移除
  deleteInGroup(userInfoId,group){
    console.log(group);
    return Observable.create(observer=>{
      this.updateGroup(group,'count',group['count']-1).subscribe(data=>{
        observer.next(true);
        observer.complete();
      });
      this.http.get(this.joinGroupURL+'?Ingroup.user.id='+userInfoId+"&&Ingroup.group.id="+group.id).subscribe(data=>{
        this.http.delete(this.joinGroupURL+data['Ingroup'][0]['id']).subscribe(success=>{

      })


        // let json = {
        //   "name":inGroup['group']['name'],
        //   "count":inGroup['group']['count']+1,
        //   "createtime":inGroup['group']['createtime']
        // };
        // this.http.put(this.groupURL+inGroup['group']['id'],json).subscribe(data=>{
        //   observer.next(true);
        //   observer.complete();
        // })
      })
    })
  }

  //将好友添加至某一分组
  addInGroup(userInfoId,group){
    return Observable.create(observer=>{
      let body = {
        user:{
          "id":userInfoId
        },
        group:{
          "id":group['id']
        },
        createtime:new Date().toLocaleString()
      };
      this.http.post(this.joinGroupURL,body).subscribe(data=>{

        let group = data['group'];
        this.updateGroup(group,'count',group['count']+1).subscribe(data=>{
          observer.next(true);
          observer.complete();
        });

        // let json = {
        //   "name":data['group']['name'],
        //   "count":data['group']['count']-1,
        //   // "createtime":group['createtime']
        // };
        // this.http.put(this.groupURL+data['group']['id'],json).subscribe(data=>{
        //   observer.next(true);
        //   observer.complete();
        // })
      })
    })
  }

  //更新分组信息
  updateGroup(group,key,value){
    return Observable.create(observer=>{
      group[key] = value;
      this.http.put(this.groupURL+group.id,group).subscribe(data=>{})
      observer.next();
      observer.complete();
    })
  }

  //
  // modifyInGroupList(joinGroups,newInGroupIdList,userInfoId){
  //   return Observable.create(observer=>{
  //     for(let joinGroup of joinGroups){
  //       this.http.delete(this.joinGroupURL+joinGroup['id']).subscribe(data=>{
  //       })
  //     }
  //     for(let inGroupId of newInGroupIdList) {
  //       let body = {
  //         user: {
  //           "id": userInfoId
  //         },
  //         group: {
  //           "id": inGroupId
  //         },
  //         createtime: new Date().toLocaleString()
  //       };
  //       this.http.post(this.joinGroupURL, body).subscribe(data => {
  //       });
  //     }
  //     observer.next();
  //     observer.complete();
  //   })
  // }

  //创建分组
  createGroup(userInfo,groupName) {
    return Observable.create(observer => {
      let body = {
        "name":groupName,
        "count":0,
        'createtime':new Date().getTime()
      };
      this.http.post(this.groupURL,body).subscribe(data=>{
        let groupId = data["id"];
        let hasgroup = [];
        for(let group of userInfo.hasgroup){
          hasgroup.push(group);
        }
        hasgroup.push({"id":groupId,"name":groupName,"count":0});
        // hasgroup.push({"id":groupId});
        userInfo.hasgroup = hasgroup;
        // AppConfig.setUserInfo(userInfo);
        this.http.put(this.userInfoURL+userInfo.id,userInfo).subscribe(data=>{
          console.log(data);
          observer.next(hasgroup);
          observer.complete();
        })
      });
    })

  }

}
