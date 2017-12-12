import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  private todo : FormGroup;
  constructor( private formBuilder: FormBuilder ) {
    this.todo = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['',Validators.required],
      description: [''],
    });
  }
  logForm(){
    console.log(this.todo.value)
  }
}
