import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";

/*
  Generated class for the ImgServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImgServiceProvider {

  avatar = '';

  constructor(public http: HttpClient, public imagePicker: ImagePicker, public camera: Camera) {
    console.log('Hello ImgServiceProvider Provider');
  }

  takePhoto():string{
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 200,
      targetHeight: 200,
      saveToPhotoAlbum: true,
    };

    this.camera.getPicture(options).then(image => {
      this.avatar = image.slice(7);
    }, error => {
      console.log('Error: ' + error);
    });
    return this.avatar;
  }

  chooseFromAlbum():string {
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 200,
      height: 200
    };
    this.imagePicker.getPictures(options).then(images => {
      if (images.length > 1) {
        this.avatar = "error";
      } else if (images.length === 1) {
        console.log('Image URI: ' + images[0]);
        this.avatar = images[0];
      }
    }, error => {
      console.log('Error: ' + error);
    });
    return this.avatar;
  }



}
