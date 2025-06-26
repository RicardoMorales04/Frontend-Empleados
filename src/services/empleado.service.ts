import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  //atributos
  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { }

  //metodo para agregar un empleado
  agregarEmpleado(data: any):Observable<any> {
    let url = `${this.baseUri}/agregar`;
    return this.http.post(url,data).pipe(catchError(this.errorManager))
  }

  //metodo para obtener todos los empleados
  getEmpleados(){
    let url = `${this.baseUri}/empleados`;
    return this.http.get(url);
  }

  //metodo para obtener un empleado por id
  getEmpleado(id:any): Observable<any> {
    let url = `${this.baseUri}/empleados/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(map((res:any) => {
      return res || {};
    }),
    catchError(this.errorManager)
    );
  }

  //metodo para actualizar un empleado
  actualizarEmpleado(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/actualizar/${id}`;
    return this.http.put(url, data, {headers: this.headers}).pipe(catchError(this.errorManager));
  }

  //metodo para eliminar un empleado
  eliminarEmpleado(id:any): Observable<any> {
    let url = `${this.baseUri}/eliminar/${id}`;
    return this.http.delete(url, {headers: this.headers}).pipe(catchError(this.errorManager));
  }

  //manejar de errores
  errorManager(error: HttpErrorResponse) {
    let errorMessage='';
    if(error.error instanceof ErrorEvent) {
      //obtenemos el error del lado del cliente
      errorMessage = error.error.message;
    }
    else{
      //obtenemos el error del lado del servidor
      errorMessage = `Error: ${error.status} \n Mensaje: ${error.message}`;
    }
    console.log(error.message);
    return throwError(() => {
      return errorMessage;
    });
  }
}
