import { Routes } from '@angular/router';
import { ListarEmpleadosComponent } from './pages/listar-empleados/listar-empleados.component';
import { AgregarEmpleadoComponent } from './pages/agregar-empleado/agregar-empleado.component';
import { EditarEmpeladoComponent } from './pages/editar-empelado/editar-empelado.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listar-empleados'
    },
    {
        path: 'listar-empleados',
        component: ListarEmpleadosComponent
    },
    {
        path: 'agregar-empleado',
        component: AgregarEmpleadoComponent
    },
    {
        path: 'editar-empleado/:id',
        component: EditarEmpeladoComponent
    },
    {
        path: '**',
        redirectTo: 'listar-empleados'
    }
];
