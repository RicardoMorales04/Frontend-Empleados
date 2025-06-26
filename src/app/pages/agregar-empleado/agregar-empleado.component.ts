import { Component, OnInit, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../services/empleado.service'; 

@Component({
  selector: 'app-agregar-empleado',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './agregar-empleado.component.html',
  styleUrl: './agregar-empleado.component.css'
})
export class AgregarEmpleadoComponent implements OnInit{

//propiedades
empleadoForm: FormGroup = new FormGroup({});
enviado: boolean = false;
empleadoDepartamentos: any = [
  'Administración',
  'Contabilidad',
  'Recursos Humanos',
  'TI',
  'Ventas'
];
  constructor(
    public FormBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private empleadoService: EmpleadoService,
  ){
    this.mainForm();
  }

  ngOnInit(): void {
  }

  mainForm(){
    this.empleadoForm = this.FormBuilder.group({
      nombre: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      email: ['',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
        ],
      ],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    })
  }

  //metodo que asigna el departamento seleccionado a la propiedad del formulario
  actualizarDepartamento(event: Event):void {
    const seleccionarElemento = event.target as HTMLSelectElement;
    const departamentoSeleccionado = seleccionarElemento.value;
    this.empleadoForm.get('departamento')?.setValue(departamentoSeleccionado);
  }

  //getter para acceder a los contoles del formulario
  get myForm(){
    return this.empleadoForm.controls;
  }

  //metodo que se ejecuta cuando se hace el submit
  onSubmit(){
    this.enviado = true;
    if(!this.empleadoForm.valid){
      return false;
    }else {
      return this.empleadoService.agregarEmpleado(this.empleadoForm.value).subscribe({
        complete: () => {
          console.log('Empleado agregado correctamente');
          this.ngZone.run(() => this.router.navigateByUrl('/listar-empleados'))
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
  }

}
