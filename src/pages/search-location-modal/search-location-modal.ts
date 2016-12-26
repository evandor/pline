import { Component, OnInit } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-search-location-modal',
  templateUrl: 'search-location-modal.html'
})
export class SearchLocationModalPage implements OnInit {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) { }

  ngOnInit() {
    var input = document.getElementById('pac-input');
    var autoComplete = new google.maps.places.Autocomplete(input);
    var ctx = this;
    autoComplete.addListener('place_changed', function (v1, v2) {
      var place = this.getPlace();
      console.log(place);
      ctx.viewCtrl.dismiss(place);
    });

  }

  // TODO Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
