import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService } from '../../../Services/Productos/productos.service'
import { NavParams } from '@ionic/angular'

@Component({
  selector: 'app-descripcion-producto',
  templateUrl: './descripcion-producto.page.html',
  styleUrls: ['./descripcion-producto.page.scss'],
})
export class DescripcionProductoPage implements OnInit {
  Producto: Producto;
  IdNegocio= 0
  IdProducto= 0;
  constructor(
    private productos: ProductosService,
    private navParams: NavParams
    ) { }

  ngOnInit() {
    this.IdNegocio = this.navParams.get('IdNegocio');
    this.IdProducto = this.navParams.get('IdProducto');
    this.productos.getProducto(this.IdProducto).subscribe(res=>{
      if(res.length > 0)
        this.Producto = res[0]
    })
  }

}
