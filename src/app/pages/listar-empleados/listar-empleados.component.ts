import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../../services/empleado.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-empleados',
  imports: [RouterLink],
  templateUrl: './listar-empleados.component.html',
  styleUrl: './listar-empleados.component.css'
})
export class ListarEmpleadosComponent implements OnInit{
  
  //propiedades
  listadoEmpleados: any = [];

  constructor(private empleadoService: EmpleadoService) {
    this.getEmpleados();
  }

  ngOnInit(): void {}

  //metodo que hace la peticion al service para obtener los empleados
  getEmpleados(){
    this.empleadoService.getEmpleados().subscribe((data) => {
      this.listadoEmpleados = data;
      console.log(this.listadoEmpleados);
    })
  }

  //metodo que elimina un empleado
  eliminarEmpleado(empleado:any, index:any){
    if(window.confirm('¿Estás seguro que lo deseas eliminar?')){
      this.empleadoService.eliminarEmpleado(empleado._id).subscribe((data) => {
        this.listadoEmpleados.splice(index,1);
      })
    }                                                                                         
  }
}
