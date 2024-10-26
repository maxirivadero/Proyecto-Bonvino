import { Component } from '@angular/core';
import { Bodega } from 'src/app/models/Bodega';
import { GestorActualizacion } from 'src/app/models/GestorActualizacion';
import { JsonToClass } from 'src/app/models/JsonToClass';

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
  
  seleccionados: string[] = [];

  opcionImportarActualizacionDeVinos() {
    this.habilitarVentana();
    this.gestorActualizacion.importarActualizacionDeVinos();
    if(this.gestorActualizacion.bodegasActualizables.length !== 0){
      this.mostrarBodegasDisponibles();
    } else {
      this.noHayBodegasActualizar = true;
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


  seleccionarBodega(event: any, nombre: string) {
      if (event.target.checked) {
          this.seleccionados.push(nombre);
      } else {
          const index = this.seleccionados.indexOf(nombre);
          if (index !== -1) {
              this.seleccionados.splice(index, 1);
          }
      }
  }
  
  tomarSeleccionBodega() {
    if (this.seleccionados.length === 0) {
      alert("Por favor, seleccione al menos una opción.");
      return;
    }
      this.gestorActualizacion.tomarSeleccionBodega(this.seleccionados);
    this.comboBodegasActualizables = !this.comboBodegasActualizables;
    this.mostrarOpcionesDeBodega = !this.mostrarOpcionesDeBodega;
    this.mostrarResumenActualizacion();
  }



  mostrarResumenActualizacion() {
    if(this.gestorActualizacion.arrayVinosMostrar && this.gestorActualizacion.arrayVinosMostrar.length > 0){
      this.resumenActualizacion = true;
      //this.gestorActualizacion.notificarSubscripciones();
    }
  };
}

