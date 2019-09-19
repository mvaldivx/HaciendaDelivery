import { Component, OnInit } from '@angular/core';
import { DireccionesService, direcciones} from '../../Services/Direcciones/direcciones.service'
import { Storage } from '@ionic/storage'
import { ModalController } from '@ionic/angular';
import { UbicacionPage } from '../ubicacion/ubicacion.page'


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
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.GetDirecciones()
  }

  GetDirecciones(){
    this.storage.get('Usuario').then(usr=>{
      if(usr){
        this.IdUsuario = usr.IdUsuario
        this.direccionesService.getDirecciones(usr.IdUsuario).subscribe(d=>{
          this.direcciones = d
        })
      }else{
        this.storage.get('ubicacion').then(u=>{
          if(u){
            this.direcciones = []
            u.selected = true
            this.direcciones.push(u)
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
      if(this.IdUsuario != 0){      
        var exist = false
        var IdDirDefault = ""
        var IdDirDefaultSelected = ""
        this.direcciones.forEach(d=>{
          if(d.Calle === r.data.calle && d.Numero === r.data.numero){
            exist = true
            IdDirDefaultSelected= d.Id
          }
          if(d.selected){
            IdDirDefault = d.Id
          }
        })
        if(!exist){

          this.getUltimoIdDIreccion().then(idDir=>{
            var aux ={
              Calle: r.data.Calle,
              IdDireccion: idDir,
              IdUsuario: this.IdUsuario,
              Latitud: r.data.lat,
              Longitud: r.data.lng,
              Numero: r.data.Numero,
              selected:true
            }
            this.direccionesService.AgregaDireccion(aux).then(()=>{
              this.direccionesService.CabiarEstatusDefault(this.IdUsuario,IdDirDefault,false)
            })
          })
        }else{
          this.direccionesService.CabiarEstatusDefault(this.IdUsuario,IdDirDefault,false)
          this.direccionesService.CabiarEstatusDefault(this.IdUsuario,IdDirDefaultSelected,true)
        }
      }else{
        this.storage.get('ubicacion').then(u=>{
          if(u){
            this.direcciones = []
            u.selected= true
            this.direcciones.push(u)
          }
        })
      } 
    });
  }

  getUltimoIdDIreccion(){
    return new Promise<number>(resolve =>{
      let response=1
      this.direccionesService.getUltimoIdDireccion().subscribe(dir =>{
        response = parseInt(dir[0].IdDireccion) + 1
        resolve(response)
      })
    })
  }

  cambiaDefault(direccion){
    if(this.IdUsuario > 0){
      this.direcciones.forEach(dir=>{
        if(dir != direccion && dir.selected){
          this.direccionesService.CabiarEstatusDefault(this.IdUsuario,dir.Id,false)
        }
      })
      this.direccionesService.CabiarEstatusDefault(this.IdUsuario,direccion.Id,!direccion.selected).then(res=>{
      })
    }
  }
}
