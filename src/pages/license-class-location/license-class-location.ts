import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { Model } from '../../models/models';

@IonicPage()
@Component({
  selector: 'page-license-class-location',
  templateUrl: 'license-class-location.html',
})
export class LicenseClassLocationPage {
  generalReceptionParam: Model.GeneralReceptionParam;
  currentLocation: Model.SuggestionLocation;
  listData: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public navigation: NavigationProvider
    ) {
  }

  ionViewDidLoad() {
    // Obtine los parametros enviados del posicionamiento
    this.listData = this.navParams.data;

  }

}
