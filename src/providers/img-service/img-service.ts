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

  // avatar = '';
  imgs = [];

  constructor(public http: HttpClient, public imagePicker: ImagePicker, public camera: Camera) {
    console.log('Hello ImgServiceProvider Provider');
  }


  public takePicture(){
    //相机参数配置
    const options = {
      quality: 50,  //照片质量，1-100，默认50
      destinationType: this.camera.DestinationType.DATA_URL,  //返回的数据类型，默认DATA_URL
      enodingType: this.camera.EncodingType.JPEG,  //照片格式，默认JPEG，还有PNG可选
      mediaType: this.camera.MediaType.PICTURE,  //媒体类型，默认PICTURE->照片，还有VIDEO等可以选
      sourceType: this.camera.PictureSourceType.CAMERA  //来源类型，默认CAMERA->相机，还有PHOTOLIBRARY->相册等可以选
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imgs.push('data:image/jpeg;base64,' + imageData);
      console.log(this.imgs)
    }, (err) => {
      // Handle error
      console.log(err)
    });
    return this.imgs;
  }
  public chooseFromAlbum(){
    //相机参数配置
    const options = {
      quality: 50,  //照片质量，1-100，默认50
      destinationType: this.camera.DestinationType.DATA_URL,  //返回的数据类型，默认DATA_URL
      enodingType: this.camera.EncodingType.JPEG,  //照片格式，默认JPEG，还有PNG可选
      mediaType: this.camera.MediaType.PICTURE,  //媒体类型，默认PICTURE->照片，还有VIDEO等可以选
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY//来源类型，默认CAMERA->相机，还有PHOTOLIBRARY->相册等可以选
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imgs.push( 'data:image/jpeg;base64,' + imageData);
      console.log(this.imgs)
    }, (err) => {
      // Handle error
      console.log(err)
    });
    return this.imgs;
  }

  // takePhoto():string{
  //   const options: CameraOptions = {
  //     quality: 100,
  //     allowEdit: true,
  //     targetWidth: 200,
  //     targetHeight: 200,
  //     saveToPhotoAlbum: true,
  //   };
  //
  //   this.camera.getPicture(options).then(image => {
  //     this.avatar = image.slice(7);
  //   }, error => {
  //     console.log('Error: ' + error);
  //   });
  //   return this.avatar;
  // }
  //
  // chooseFromAlbum():string {
  //   const options: ImagePickerOptions = {
  //     maximumImagesCount: 1,
  //     width: 200,
  //     height: 200
  //   };
  //   this.imagePicker.getPictures(options).then(images => {
  //     if (images.length > 1) {
  //       this.avatar = "error";
  //     } else if (images.length === 1) {
  //       console.log('Image URI: ' + images[0]);
  //       this.avatar = images[0];
  //     }
  //   }, error => {
  //     console.log('Error: ' + error);
  //   });
  //   return this.avatar;
  // }



}
