import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {DateTime} from "ionic-angular";

/*
  Generated class for the ContactServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactServiceProvider {
  private readonly contactURL:string = "http://120.79.42.137:8080/Entity/Ud7adca934ab4e/Card/Contact/";

  constructor(public http: HttpClient) {
    console.log('Hello ContactServiceProvider Provider');
  }


  areContacts(userInfoId,contactInfoId){
    return Observable.create(observer=>{
      let result = false;
      this.http.get(this.contactURL+"?Contact.user.id="+userInfoId+"&&Contact.contact.id="+contactInfoId).subscribe(data=>{
        if(data['Contact']){
          result = true;
          observer.next(result);
          observer.complete();
        }else{
          this.http.get(this.contactURL+"?Contact.user.id="+contactInfoId+"&&Contact.contact.id="+userInfoId).subscribe(data=>{
            if(data['Contact']){
              result = true;
            }
            observer.next(result);
            observer.complete();
          })
        }
      });
    });
  }

  addContact(userInfoId,contactInfoId){
    return Observable.create(observer=>{
      let body = {
        user:{
          id:userInfoId
        },
        contact:{
          id:contactInfoId
        },
        addtime:new Date().getTime()
      };
      this.http.post(this.contactURL,body).subscribe(data=>{

      })
    })
  }

  findContactsByUsername(username){
    return Observable.create(observer=>{
      let contactsList = []
      this.http.get(this.contactURL+"?Contact.user.include.name="+username).subscribe(contacts=>{
        if(contacts['Contact']){
          for(let contact of contacts['Contact']){
            contactsList.push(contact["contact"]);
          }
        }
        this.http.get(this.contactURL+"?Contact.contact.include.name="+username).subscribe(contacts=>{
          if(contacts['Contact']){
            for(let contact of contacts['Contact']){
              contactsList.push(contact["user"]);
            }
          }
          observer.next(contactsList);
          observer.complete();
        })
      })
    })
  }


}
