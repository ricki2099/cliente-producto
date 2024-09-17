import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CrearProductoComponent, ListarProductosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cliente';
}
