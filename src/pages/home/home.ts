import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Dialogs } from '@ionic-native/dialogs';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  location : any = { latitude: 0, longitude: 0 }

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private geo: Geolocation,
    private dialogs: Dialogs,
    private spinnerDialog: SpinnerDialog
  ) {
    
  }

  getPosicion(){
    
    let options = {
      enableHighAccuracy: true,
      timeout: 12500
    } 

    this.spinnerDialog.show(null, 'Espere...', true);

    this.geo.getCurrentPosition(options)
      .then( (position: Geoposition) => {
        this.spinnerDialog.hide();

        this.location = position.coords;
        
        /*this.dialogs.alert(position.coords.latitude + ', ' + position.coords.longitude, 'GeoLoc', 'Ya!')
          .then(() => console.log('Dialog dismissed'))
          .catch(e => console.log('Error displaying dialog', e));*/

        this.presentToast(position.coords.latitude + ', ' + position.coords.longitude);
      
      })
      .catch((error) => {
        this.spinnerDialog.hide();
        console.log('Error getting location', error);
      });

  }

  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      //duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
