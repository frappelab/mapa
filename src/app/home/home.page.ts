import { Component } from '@angular/core';
import { Geolocation } from "@capacitor/geolocation";
import * as L from "leaflet";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  private map!: L.Map;

  constructor() { }

  async obtenerPunto() {
    const position = await Geolocation.getCurrentPosition();

    const customIcon = L.icon({
      iconUrl: 'assets/icon/marker-map.png',
      iconSize: [40, 45],
      iconAnchor: [20, 40],
    });

    this.map = L.map('mapId').setView([position.coords.latitude, position.coords.longitude], 18);

    L.marker([position.coords.latitude, position.coords.longitude], { icon: customIcon }).addTo(this.map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

}
