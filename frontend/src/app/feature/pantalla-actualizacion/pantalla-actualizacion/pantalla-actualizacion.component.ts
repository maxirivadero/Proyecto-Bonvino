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
  mostrarTabla = false;
  mostrarOpcionesDeBodega = false;
  jsontConverter = new JsonToClass;
  bodegaSeleccionada = new Bodega(
    "Bodega La Riña",
    "Una bodega familiar fundada en 1975, especializada en vinos tintos de alta calidad.",
    "La historia de Bodega La Viña se remonta a hace casi medio siglo, cuando el fundador, Don Alejandro, plantó las primeras vides en estas tierras. Desde entonces, la bodega ha pasado de generación en generación, manteniendo la tradición y el compromiso con la calidad.",
    [42.8782, -8.5448],
    2,
    new Date("2024-03-15T12:30:00.000Z")
);

  opcionImportarActualizacionDeVinos() {
    this.gestorActualizacion.importarActualizacionDeVinos();
    this.habilitarVentana();
    //console.log(this.gestorActualizacion.bodegasActualizables);
    this.mostrarBodegasDisponibles();
    //console.log(this.jsontConverter.jsonToEnofilo(enofilosData));
  };
  habilitarVentana() {
    this.habilitarVentanaFlag = !this.habilitarVentanaFlag;
  };
  mostrarBodegasDisponibles() {
    if(this.gestorActualizacion.bodegasActualizables && this.gestorActualizacion.bodegasActualizables.length > 0){
      this.mostrarTabla = !this.mostrarTabla;
    }
    console.log(this.gestorActualizacion.bodegasActualizables)
  };
  solicitarSeleccionBodega() {
    if(this.gestorActualizacion.bodegasActualizables && this.gestorActualizacion.bodegasActualizables.length > 0){
      this.mostrarOpcionesDeBodega = !this.mostrarOpcionesDeBodega;
    }
  }

  tomarSeleccionBodega(bodega: Bodega) {
    this.bodegaSeleccionada = bodega;
    this.gestorActualizacion.tomarSeleccionBodega(bodega);
    this.mostrarTabla = !this.mostrarTabla;
    this.mostrarOpcionesDeBodega = !this.mostrarOpcionesDeBodega;
    this.mostrarResumenActualizacion();
  }
  mostrarResumenActualizacion() {
    console.log(this.gestorActualizacion.vinosActualizados);
    this.gestorActualizacion.notificarSubscripciones(this.bodegaSeleccionada);
  };
}
