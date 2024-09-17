import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  url = 'http://localhost:3000/api/productos/';
  constructor(private http: HttpClient) {}

  getProduct(): Observable<any> {
    return this.http.get(this.url);
  }
  getProductById(id: string): Observable<any> {
    console.log(this.url + id);
    return this.http.get(this.url + id);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  createProduct(producto: any): Observable<any> {
    return this.http.post(this.url, producto);
  }

  updateProduct(id: string, producto: any): Observable<any> {
    return this.http.put(this.url + id, producto);
  }
}
