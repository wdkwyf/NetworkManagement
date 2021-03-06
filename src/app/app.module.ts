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
import {Geolocation} from '@ionic-native/geolocation';
import {Contacts} from "@ionic-native/contacts";
import {FileTransfer} from "@ionic-native/file-transfer";
import {File} from '@ionic-native/file';
import {MultiPickerModule} from 'ion-multi-picker';
import {SelectorDataProvider} from '../providers/selector-data/selector-data';
import {ChartsModule} from "ng2-charts";
import {NativeStorage} from "@ionic-native/native-storage";
import {QQSDK} from "@ionic-native/qqsdk";
import {NgxQRCodeModule} from "ngx-qrcode2";
import {Toast} from "@ionic-native/toast";
import {Screenshot} from '@ionic-native/screenshot';
import {PhotoViewer} from '@ionic-native/photo-viewer';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import { ContactServiceProvider } from '../providers/contact-service/contact-service';
import { GroupServiceProvider } from '../providers/group-service/group-service';
import { NoteServiceProvider } from '../providers/note-service/note-service';
import { MomentServiceProvider } from '../providers/moment-service/moment-service';

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
    File,
    FileTransfer,
    Contacts,
    CardServiceProvider,
    SelectorDataProvider,
    NativeStorage,
    QQSDK,
    NgxQRCodeModule,
    Toast,
    Screenshot,
    PhotoViewer,
    BarcodeScanner,
    Geolocation,
    ContactServiceProvider,
    GroupServiceProvider,
    NoteServiceProvider,
    MomentServiceProvider
  ]
})
export class AppModule {
}
