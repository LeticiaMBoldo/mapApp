import { Component } from '@angular/core';
import { ViewChild, ElementRef} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google:any;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map:any; 
  posicaoAtual:any;
  
  @ViewChild('map', {read: ElementRef, static:false}) mapRef:ElementRef;

  constructor(private geolocation: Geolocation) {}

  public async showMap(){
    //const location = new google.maps.LatLng(-22.197439, -48.775970); posição fixa
    const posicaoUm = new google.maps.LatLng(-22.514409, -48.556951);
    const posicaoDois = new google.maps.LatLng(-22.507093, -48.550263);
    const posicaoTres = new google.maps.LatLng(-22.502505, -48.561440);
    const posicaoQuatro = new google.maps.LatLng(-22.505607, -48.556139);
    const posicaoCinco = new google.maps.LatLng(-22.508243, -48.555635);

    await this.buscarPosicao();
    const options = {
      center:this.posicaoAtual,
      zoom:15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    //criar um marcador da posição no mapa
    const marcador = new google.maps.Marker( {
      position: this.posicaoAtual,
      map: this.map,
      title:"Minha posição atual",
      icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      animation: google.maps.animation.BOUNCE
    })
  }

  ionViewDidEnter() {
    this.showMap();
  }

  public async buscarPosicao() {
    await this.geolocation.getCurrentPosition().then((posicaoGPS) => {

      //Guardar a posição atual
      this.posicaoAtual = {
        lat: posicaoGPS.coords.latitude,
        lng: posicaoGPS.coords.longitude,
      };
     }).catch((error) => {
       console.log('Error getting location', error);
     });     
  }

}
