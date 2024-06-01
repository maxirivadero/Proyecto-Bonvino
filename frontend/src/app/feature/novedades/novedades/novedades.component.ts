import { Component } from '@angular/core';
import { PantallaActualizacion } from 'src/app/interfaces/PantallaActualizacion';
import { Bodega } from 'src/app/models/Bodega';
import { GestorActualizacion } from 'src/app/models/GestorActualizacion';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss']
})
export class NovedadesComponent implements PantallaActualizacion{
  gestor = new GestorActualizacion();
  habilitarVentanaFlag = true;
  mostrarTabla = false;
  mostrarOpcionesDeBodega = false;
  bodegaSeleccionada = new Bodega(
    "Bodega La Riña",
    "Una bodega familiar fundada en 1975, especializada en vinos tintos de alta calidad.",
    "La historia de Bodega La Viña se remonta a hace casi medio siglo, cuando el fundador, Don Alejandro, plantó las primeras vides en estas tierras. Desde entonces, la bodega ha pasado de generación en generación, manteniendo la tradición y el compromiso con la calidad.",
    [42.8782, -8.5448],
    2,
    new Date("2024-03-15T12:30:00.000Z")
);

  opcionImportarActualizacionDeVinos() {
    this.gestor.importarActualizacionDeVinos();
    this.habilitarVentana();
    console.log(this.gestor.bodegasActualizables);
    this.mostrarBodegasDisponibles();
  };
  habilitarVentana() {
    this.habilitarVentanaFlag = !this.habilitarVentanaFlag;
  };
  mostrarBodegasDisponibles() {
    if(this.gestor.bodegasActualizables && this.gestor.bodegasActualizables.length > 0){
      this.mostrarTabla = !this.mostrarTabla;
    }
  };
  solicitarSeleccionBodega() {
    if(this.gestor.bodegasActualizables && this.gestor.bodegasActualizables.length > 0){
      this.mostrarOpcionesDeBodega = !this.mostrarOpcionesDeBodega;
    }
  }

  tomarSeleccionBodega(bodega: Bodega) {
    this.bodegaSeleccionada = bodega;
    this.gestor.tomarSeleccionBodega(bodega);
    this.mostrarTabla = !this.mostrarTabla;
    this.mostrarOpcionesDeBodega = !this.mostrarOpcionesDeBodega;
    this.mostrarResumenActualizacion();
  }
  mostrarResumenActualizacion() {
    console.log(this.gestor.vinosActualizados);
    this.gestor.notificarSubscripciones(this.bodegaSeleccionada);
  };
}
