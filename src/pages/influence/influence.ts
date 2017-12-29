import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfluencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-influence',
  templateUrl: 'influence.html',
})
export class InfluencePage {


  personalUsername = '';
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40,50,40,50,55], label: '影响力'},

  ];
  public lineChartLabels:Array<any> = ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },

  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.personalUsername = navParams.get('username');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfluencePage');
  }


// events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
