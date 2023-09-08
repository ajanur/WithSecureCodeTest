import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, catchError, forkJoin, throwError } from 'rxjs';
import { Product, ProductElements } from 'src/app/models/product.model';

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

  AddProduct(product:any):Observable<ProductElements>{
    const headers = {'content-type': 'application/json' };
    const body = product;
      console.log(JSON.stringify(body));
      return this.http.post<ProductElements>(this.BaseUrl + '/add',JSON.stringify(body),{headers : headers})
      .pipe(catchError(this.handleError));
  }

  UpdateProduct(id: number, product: any):Observable<any>{
    const headers = {'content-type': 'application/json' };
    const body = product;
    return this.http.put<ProductElements>(this.BaseUrl + '/' + id,JSON.stringify(body), {headers : headers})
      .pipe(catchError(this.handleError));
  }

  DeleteProduct(id: number):Observable<any>{
    return this.http.delete<any>(this.BaseUrl + '/' + id)
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
