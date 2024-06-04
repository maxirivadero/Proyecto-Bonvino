import { Component } from '@angular/core';
import { Bodega } from 'src/app/models/Bodega';
import { GestorActualizacion } from 'src/app/models/GestorActualizacion';
import { JsonToClass } from 'src/app/models/JsonToClass';
//import enofilosData from "../../../../assets/json/enofilos.json";

@Component({
  selector: 'app-pantalla-actualizacion',
  templateUrl: './pantalla-actualizacion.component.html',
  styleUrls: ['./pantalla-actualizacion.component.scss']
})
export class PantallaActualizacionComponent {
  gestorActualizacion = new GestorActualizacion();
  habilitarVentanaFlag = true;
  comboBodegasActualizables = false;
  mostrarOpcionesDeBodega = false;
  resumenActualizacion = false;
  noHayBodegasActualizar = false;
  jsontConverter = new JsonToClass;

  opcionImportarActualizacionDeVinos() {
    this.habilitarVentana();
    this.gestorActualizacion.importarActualizacionDeVinos();
    console.log(this.gestorActualizacion.bodegasActualizables);
    if(this.gestorActualizacion.bodegasActualizables.length !== 0){
      this.mostrarBodegasDisponibles();
    } else {
      this.noHayBodegasActualizar = true;
      this.gestorActualizacion.finCU()
    }
  };
  habilitarVentana() {
    this.habilitarVentanaFlag = !this.habilitarVentanaFlag;
  };
  mostrarBodegasDisponibles() {
    if(this.gestorActualizacion.bodegasActualizables && this.gestorActualizacion.bodegasActualizables.length > 0){
      this.comboBodegasActualizables = !this.comboBodegasActualizables;
    }
  };
  solicitarSeleccionBodega() {
    if(this.gestorActualizacion.bodegasActualizables && this.gestorActualizacion.bodegasActualizables.length > 0){
      this.mostrarOpcionesDeBodega = !this.mostrarOpcionesDeBodega;
    }
  }

  tomarSeleccionBodega(nombresBodega: string) {
    this.gestorActualizacion.tomarSeleccionBodega(nombresBodega);
    this.comboBodegasActualizables = !this.comboBodegasActualizables;
    this.mostrarOpcionesDeBodega = !this.mostrarOpcionesDeBodega;
    this.mostrarResumenActualizacion();
    this.gestorActualizacion.notificarSubscripciones();
  }
  mostrarResumenActualizacion() {
    console.log("RESUMEN",this.gestorActualizacion.vinosActualizados);
    if(this.gestorActualizacion.vinosActualizados && this.gestorActualizacion.vinosActualizados.length > 0){
      this.resumenActualizacion = true;
    }
  };
}
/*  bodegaSeleccionada = new Bodega(
  "Bodega La Riña",
  "Una bodega familiar fundada en 1975, especializada en vinos tintos de alta calidad.",
  "La historia de Bodega La Viña se remonta a hace casi medio siglo, cuando el fundador, Don Alejandro, plantó las primeras vides en estas tierras. Desde entonces, la bodega ha pasado de generación en generación, manteniendo la tradición y el compromiso con la calidad.",
  [42.8782, -8.5448],
  2,
  new Date("2024-03-15T12:30:00.000Z")
  */