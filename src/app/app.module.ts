import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {HttpClientModule} from "@angular/common/http";
import {Camera} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";
import {ImgServiceProvider} from '../providers/img-service/img-service';
import {CardServiceProvider} from '../providers/card-service/card-service';
import {FileOpener} from "@ionic-native/file-opener";
import {HTTP} from "@ionic-native/http";
import {FileChooser} from "@ionic-native/file-chooser";
import {Contacts} from "@ionic-native/contacts";
import {FileTransfer} from "@ionic-native/file-transfer";
import {File} from '@ionic-native/file';
import {MultiPickerModule} from 'ion-multi-picker';
import { SelectorDataProvider } from '../providers/selector-data/selector-data';
import {ChartsModule} from "ng2-charts";
import {NativeStorage} from "@ionic-native/native-storage";
import {QQSDK} from "@ionic-native/qqsdk";
import {NgxQRCodeModule} from "ngx-qrcode2";
import {Toast} from "@ionic-native/toast";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    MultiPickerModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    Camera,
    ImagePicker,
    ImgServiceProvider,
    FileOpener,
    HTTP,
    FileChooser,
    File,
    FileTransfer,
    Contacts,
    CardServiceProvider,
    SelectorDataProvider,
    NativeStorage,
    QQSDK,
    NgxQRCodeModule,
    Toast,
    BarcodeScanner
  ]
})
export class AppModule {
}
