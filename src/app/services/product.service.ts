import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, catchError, forkJoin, throwError } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Todo } from 'src/app/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //Without Cors enable in server using proxy config
  BaseUrl : string = "http://localhost:4200/products";

  constructor(private http:HttpClient) { }
  
  GetProductList():Observable<any>{
    return this.http.get<any>(this.BaseUrl)
    .pipe(catchError(this.handleError));
  }

  GetProduct(id:Guid):Observable<Product>{
    return this.http.get<Product>(this.BaseUrl + '/' + id).pipe(catchError(this.handleError));
  }

  GetSearchProduct(search:string):Observable<any>{
    return this.http.get<any>(this.BaseUrl + '/search?q=' + search ).pipe(catchError(this.handleError));
  }

  AddProduct(product: Product):Observable<Product>{
    const headers = {'content-type': 'application/json' };
    const body = { 
        "title": product.title,
        "description": product,
        "price": product,
        "discountPercentage":product,
        "rating": product,
        "stock": product,
        "brand": product,
        "category": product.category,
      };
      //console.log(JSON.stringify(body));
      return this.http.post<Product>(this.BaseUrl + '/add',JSON.stringify(body),{headers : headers})
      .pipe(catchError(this.handleError));
  }

  UpdateProduct(todo: Todo):Observable<any>{
    const headers = {'content-type': 'application/json' };
    const body = { 
      "Id": todo.id.toString(),
      "Name" : todo.name,
      "Priority":todo.priority,
      "Status" : todo.status
     };
    //console.log(" Update Service...");
    return this.http.put<Todo>(this.BaseUrl + '/update',JSON.stringify(body), {headers : headers})
      .pipe(catchError(this.handleError));
  }

  DeleteProduct(id: number):Observable<any>{
    //console.log(" Delete Service...");
    return this.http.delete<any>(this.BaseUrl + '/delete/' + id)
      .pipe(catchError(this.handleError));
  }

  //Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = {
      code : 500,
      error : "Unknown error!",
    };
    if (error.error instanceof ErrorEvent) {
      // log Client-side errors
      errorMessage.error = `Error: ${error.error.message}`;
    } else {
      // log Server-side errors
      console.log(error);
      errorMessage.code = error.status;
      //errorMessage.error = `Error Code: ${error.status}\nMessage: ${error.message}`;
      errorMessage.error = error.error.errors != null ? JSON.stringify(error.error.errors) : error.error;
    }
    //window.alert(errorMessage);
    return throwError(()=>errorMessage);
  }

}
