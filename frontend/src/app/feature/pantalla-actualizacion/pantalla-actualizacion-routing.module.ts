import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantallaActualizacionComponent } from './pantalla-actualizacion/pantalla-actualizacion.component';

const routes: Routes = [{ path: '', component: PantallaActualizacionComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PantallaActualizacionRoutingModule { }
