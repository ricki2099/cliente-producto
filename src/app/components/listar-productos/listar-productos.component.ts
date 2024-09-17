import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.scss',
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];

  constructor(
    private _productoService: ProductoService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoService.getProduct().subscribe({
      next: (data: any) => {
        this.listProductos = data;
      },
      error: (error: any) => {
        this.toastr.error(JSON.stringify(error.statusText), 'Existe un error!');
      },
    });
  }

  borrar(id: any) {
    this._productoService.deleteProduct(id).subscribe({
      next: (data: any) => {
        this.toastr.success(
          'El producto fue eliminado de forma exitosa!',
          'Producto eliminado!'
        );

        this.obtenerProductos();
      },
      error: (error: any) => {
        this.toastr.error(JSON.stringify(error.message), 'Existe un error!');
      },
    });
  }
}
