import { Component, OnInit } from '@angular/core';
import { DireccionesService, direcciones} from '../../Api/Services/Direcciones/direcciones.service'
import { Storage } from '@ionic/storage'
import { ModalController } from '@ionic/angular';
import { UbicacionPage } from '../ubicacion/ubicacion.page'
import { StoreDireccionesService } from '../../Api/Services/Direcciones/Store/store.service'


@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.page.html',
  styleUrls: ['./direcciones.page.scss'],
})
export class DireccionesPage implements OnInit {
direcciones: direcciones[]
IdUsuario = 0
  constructor(
    private direccionesService: DireccionesService,
    private storage: Storage,
    private modalCtrl: ModalController,
    private StoreDirecciones:StoreDireccionesService
  ) { }

  ngOnInit() {
    this.GetDirecciones()
  }

  GetDirecciones(){
    this.storage.get('Usuario').then(usr=>{
      if(usr){
        this.IdUsuario = usr.IdUsuario
        this.direccionesService.getDirecciones(usr.IdUsuario).subscribe(d=>{
          this.StoreDirecciones.direcciones = d
          this.direcciones = d
        })
      }else{
        this.storage.get('ubicacion').then(u=>{
          if(u){
            u.selected = true
            this.StoreDirecciones.direcciones.push(u)
          }
        })
      }
      
    })
  }

  async Mapa(){
    const modal = await this.modalCtrl.create({
      component:UbicacionPage,
      cssClass: 'my-custom-modal-css'
    })
    await modal.present();
    await modal.onWillDismiss().then(r=>{
      if(this.IdUsuario != 0 && r.data){    
        var exist = false
        var IdDirDefault = -1
        var IdDirDefaultSelected = -1
        this.StoreDirecciones.direcciones.forEach(d=>{
          if(d.Calle === r.data.calle && d.Numero === r.data.numero){
            exist = true
            IdDirDefaultSelected= d.IdDireccion
          }
          if(d.selected){
            IdDirDefault = d.IdDireccion
          }
        })
        if(!exist){
            var aux ={
              Calle: r.data.Calle,
              IdUsuario: this.IdUsuario,
              Latitud: r.data.lat,
              Longitud: r.data.lng,
              Numero: r.data.Numero,
              selected:true
            }
            this.direccionesService.AgregaDireccion(aux).subscribe((res)=>{
              this.direccionesService.CabiarEstatusDefault(this.IdUsuario,IdDirDefault,0).subscribe(()=>{
                this.GetDirecciones()
              })
              
              /*console.log(res)
              this.direccionesService.CabiarEstatusDefault(this.IdUsuario,IdDirDefault,false)*/
            })
        }else{
          this.direccionesService.CabiarEstatusDefault(this.IdUsuario,IdDirDefault,0).subscribe()
          this.direccionesService.CabiarEstatusDefault(this.IdUsuario,IdDirDefaultSelected,1).subscribe(()=>{
            this.GetDirecciones()
          })
          
        }
      }else{
        this.storage.get('ubicacion').then(u=>{
          if(u){
            u.selected= true
            this.StoreDirecciones.direcciones.push(u)
          }
        })
      } 
    });
  }


  cambiaDefault(direccion){
    if(this.IdUsuario > 0){
      var noModificar = false;
      this.StoreDirecciones.direcciones.forEach(dir=>{
        if(dir != direccion && dir.selected === 1){
          this.direccionesService.CabiarEstatusDefault(this.IdUsuario,dir.IdDireccion,0).subscribe()
        }else if(dir === direccion && dir.selected === 1){
          noModificar = true
        }
      })
      if(!noModificar){
        this.direccionesService.CabiarEstatusDefault(this.IdUsuario,direccion.IdDireccion,(direccion.selected === 1?0:1)).subscribe(()=>{
          this.GetDirecciones()
        })
      }
      
      
    }
  }

}
