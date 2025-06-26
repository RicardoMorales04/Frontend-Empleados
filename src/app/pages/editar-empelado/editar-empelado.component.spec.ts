import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmpeladoComponent } from './editar-empelado.component';

describe('EditarEmpeladoComponent', () => {
  let component: EditarEmpeladoComponent;
  let fixture: ComponentFixture<EditarEmpeladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEmpeladoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEmpeladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
