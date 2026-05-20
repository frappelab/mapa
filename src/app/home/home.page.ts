import { AfterViewInit, Component } from '@angular/core';
import { Geolocation } from "@capacitor/geolocation";
import * as L from "leaflet";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements AfterViewInit {

  private map!: L.Map;

  contador = 0;

  constructor() { }

  async ngAfterViewInit() {
     this.ruta();
  }

  async ruta() {

    const puntos = [
     { name: "ETITC", coords: [4.606449, -74.08132] },
      { name: "CIGARRERIA", coords: [4.605357, -74.080991] },
      { name: "TIENDA ESQUINA", coords: [4.604191, -74.080058] },
      { name: "MADECENTRO", coords: [4.603564, -74.079347] },
      { name: "CELULARES", coords: [4.603114, -74.078811] },
    ];
    const position = await Geolocation.getCurrentPosition();
    this.map = L.map('mapId').setView([position.coords.latitude, position.coords.longitude], 8);
    const ruta = L.polyline(puntos.map(p => p.coords as [number, number]), { color: 'red' }).addTo(this.map);
    this.map.fitBounds(ruta.getBounds());

    this.map.setZoom(16);

    const customIcon = L.icon({
      iconUrl: 'assets/icon/marker-map.png',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    puntos.forEach((p) => {
      L.marker(p.coords as [number, number], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(p.name)
        .openPopup();
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  async Punto() {
    const position = await Geolocation.getCurrentPosition();
    this.contador += 1;
    console.log(position);
  }

  async trazar(){
    this.ruta();
  }

  async obtenerPunto() {
    const position = await Geolocation.getCurrentPosition();

    const customIcon = L.icon({
      iconUrl: 'assets/icon/marker-map.png',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    this.map = L.map('mapId').setView([position.coords.latitude, position.coords.longitude], 18);

    L.marker([position.coords.latitude, position.coords.longitude], { icon: customIcon })
      .addTo(this.map)
      .bindPopup('Hola.<br> Estoy aqui!.')
      .openPopup();

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

}
