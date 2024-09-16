import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Producto } from '../../models/producto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss',
})
export class CrearProductoComponent {
  crearProductoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.crearProductoForm = this.formBuilder.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }

  agregarProducto() {
    console.log('Valores', this.crearProductoForm.value);
    const { producto, categoria, ubicacion, precio } =
      this.crearProductoForm.value;
    const productoModel: Producto = {
      nombre: producto,
      categoria: categoria,
      ubicacion: ubicacion,
      precio: precio,
    };
    console.log('Objeto', productoModel);
    this.toastr.success('El producto fue agregado de forma exitosa!', 'Producto registrado!');
    this.router.navigate(['/']);
  }
}
