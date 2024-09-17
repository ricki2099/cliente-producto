import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Producto } from '../../models/producto';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss',
})
export class CrearProductoComponent implements OnInit {
  crearProductoForm: FormGroup;
  titulo = 'Crear un nuevo producto';
  id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private idRouter: ActivatedRoute
  ) {
    this.crearProductoForm = this.formBuilder.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.id = this.idRouter.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.cargarDataEditar();
  }

  agregarProducto() {
    const { producto, categoria, ubicacion, precio } =
      this.crearProductoForm.value;
    const productoModel: Producto = {
      nombre: producto,
      categoria: categoria,
      ubicacion: ubicacion,
      precio: precio,
    };
    if (this.id) {
      this.editar(productoModel);
    } else {
      this._productoService.createProduct(productoModel).subscribe({
        next: (data: any) => {
          this.toastr.success(
            'El producto fue agregado de forma exitosa!',
            'Producto registrado!'
          );
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          this.toastr.error(JSON.stringify(error.message), 'Existe un error!');
        },
      });
    }
  }

  cargarDataEditar() {
    if (this.id) {
      this.titulo = 'Editar producto';
      this._productoService.getProductById(this.id).subscribe({
        next: (data: any) => {
          this.crearProductoForm.setValue({
            producto: data.nombre,
            categoria: data.categoria,
            ubicacion: data.ubicacion,
            precio: data.precio,
          });
        },
        error: (error: any) => {
          this.toastr.error(JSON.stringify(error.message), 'Existe un error!');
        },
      });
    }
  }
  editar(productoModel: any) {
    this._productoService.updateProduct(this.id, productoModel).subscribe({
      next: (data: any) => {
        this.toastr.success(
          'El producto fue actualizado de forma exitosa!',
          'Producto actualizado!'
        );
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        this.toastr.error(JSON.stringify(error.message), 'Existe un error!');
      },
    });
  }
}
