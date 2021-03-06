import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'categorias', pathMatch: 'full' },
  { path: 'categorias', loadChildren: './Pages/Principal/categorias/categorias.module#CategoriasPageModule' },
  { path: 'negocios', loadChildren: './Pages/Principal/negocios/negocios.module#NegociosPageModule' },
  { path: 'menu', loadChildren: './Pages/menu/menu.module#MenuPageModule' },
  { path: 'carrito', loadChildren: './Pages/carrito/carrito.module#CarritoPageModule' },  { path: 'productos', loadChildren: './Pages/Principal/productos/productos.module#ProductosPageModule' },
  { path: 'descripcion-producto', loadChildren: './Pages/Principal/descripcion-producto/descripcion-producto.module#DescripcionProductoPageModule' },
  { path: 'resenias', loadChildren: './Pages/Principal/resenias/resenias.module#ReseniasPageModule' },
  { path: 'ubicacion', loadChildren: './Pages/ubicacion/ubicacion.module#UbicacionPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
