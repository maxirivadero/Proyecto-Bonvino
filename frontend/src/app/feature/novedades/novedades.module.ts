import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovedadesRoutingModule } from '../novedades/novedades-routing.module';
import { NovedadesComponent } from './novedades/novedades.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [NovedadesComponent],
  imports: [
    CommonModule,
    NovedadesRoutingModule,
    SharedModule
  ]
})
export class NovedadesModule { }
