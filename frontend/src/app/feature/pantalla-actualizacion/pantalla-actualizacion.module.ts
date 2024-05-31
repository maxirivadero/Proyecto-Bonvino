import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantallaActualizacionRoutingModule } from './pantalla-actualizacion-routing.module';
import { PantallaActualizacionComponent } from './pantalla-actualizacion/pantalla-actualizacion.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [PantallaActualizacionComponent],
  imports: [
    CommonModule,
    PantallaActualizacionRoutingModule,
    SharedModule
  ]
})
export class PantallaActualizacionModule { }
