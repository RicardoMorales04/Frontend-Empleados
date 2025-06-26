import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../services/empleado.service'; 

@Component({
  selector: 'app-editar-empelado',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editar-empelado.component.html',
  styleUrl: './editar-empelado.component.css'
})
export class EditarEmpeladoComponent  implements OnInit{

//propiedades
editarEmpleadoForm: FormGroup = new FormGroup({});
enviado: boolean = false;
empleadoDepartamentos: any = [
  'Administración',
  'Contabilidad',
  'Recursos Humanos',
  'TI',
  'Ventas'
];

empleadoData: EmpleadoService[] = [];

  constructor(
    public FormBuilder: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private empleadoService: EmpleadoService,
  ){
    //this.mainForm();
  }

  ngOnInit(): void {
    this.mainForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmpleado(id);
  }

  mainForm(){
    this.editarEmpleadoForm = this.FormBuilder.group({
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
    this.editarEmpleadoForm.get('departamento')?.setValue(departamentoSeleccionado);
  }

  //getter para acceder a los contoles del formulario
  get myForm(){
    return this.editarEmpleadoForm.controls;
  }

  //método para buscar al empleado que se va a modificar y asignarlo al formulario
  getEmpleado(id:any){
    this.empleadoService.getEmpleado(id).subscribe((data) => {
      this.editarEmpleadoForm.setValue({
        nombre: data['nombre'],
        departamento: data['departamento'],
        email: data['email'],
        telefono: data['telefono']
      })
    })
  }

  //metodo que se ejecuta cuando se hace el submit
  onSubmit(){
    this.enviado = true;
    if(!this.editarEmpleadoForm.valid){
      return false;
    }else {
      if(window.confirm('¿Estas seguro que deseas modificar el empleado?')){
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.empleadoService.actualizarEmpleado(id, this.editarEmpleadoForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/listar-empleados');
            console.log('Se actualizo correctamente el empleado');            
          },
          error: (e) => {
            console.log(e); 
          }
        })
      }
    }
    return true;
  }



  
}