import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'categorias', pathMatch: 'full' },
  { path: 'categorias', loadChildren: './Pages/Principal/categorias/categorias.module#CategoriasPageModule' },
  { path: 'negocios', loadChildren: './Pages/Principal/negocios/negocios.module#NegociosPageModule' },
  { path: 'menu', loadChildren: './Pages/menu/menu.module#MenuPageModule' },
  { path: 'carrito', loadChildren: './Pages/carrito/carrito.module#CarritoPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
