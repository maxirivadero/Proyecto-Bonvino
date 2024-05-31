import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaActualizacionComponent } from './pantalla-actualizacion.component';

describe('PantallaActualizacionComponent', () => {
  let component: PantallaActualizacionComponent;
  let fixture: ComponentFixture<PantallaActualizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantallaActualizacionComponent]
    });
    fixture = TestBed.createComponent(PantallaActualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
