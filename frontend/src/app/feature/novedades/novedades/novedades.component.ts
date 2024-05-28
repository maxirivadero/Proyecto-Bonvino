import { Component } from '@angular/core';
import { PantallaActualizacion } from 'src/app/interfaces/PantallaActualizacion';
import { GestorActualizacion } from 'src/app/models/GestorActualizacion';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss']
})
export class NovedadesComponent implements PantallaActualizacion{
  gestor = new GestorActualizacion();

  opcionImportarActualizacionDeVinos() {
    this.gestor.buscarBodegasActualizables();
    console.log(this.gestor.bodegasActualizables);
  };
  habilitarVentana() {
    
  };
  mostrarBodegasDisponibles() {
    
  };
  solicitarSeleccionBodega() {
    
  };
  tomarSeleccionBodega() {
    
  };
  mostrarResumenActualizacion() {
    
  };
}
