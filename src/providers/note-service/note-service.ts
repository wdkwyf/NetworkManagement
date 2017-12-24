import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the NoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NoteServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NoteServiceProvider Provider');
  }

  postNote(imgs,noteTitle, noteContent,username,contactName) {
    console.log(username+' '+contactName+" "+noteTitle+' '+noteContent);
    //todo 存数据
    return Observable.create(observer => {
      let note = {
        'id': 3,
        'creatorName': username,
        'contactName': contactName,
        'createTime': '2017-10-12',
        'title': 'hhh',
        'content': 'first note'
      };
      observer.next(note);
      observer.complete();
    })
  }

  getNoteListByNames(username, contactName) {
    return Observable.create(observer => {
      let noteList = [{
        'id': 1,
        'creatorName': username,
        'contactName': contactName,
        'createTime': '2017-10-12',
        'title': 'hhh',
        'content': 'first note'
      }, {
        'id': 2,
        'creatorName': username,
        'contactName': contactName,
        'createTime': '2017-10-12',
        'title': 'hhh',
        'content': 'second note'
      }];
      observer.next(noteList);
      observer.complete();
    })
  }

}
