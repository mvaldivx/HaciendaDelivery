import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, Events } from '@ionic/angular';
import { trigger, state, style, animate, transition} from '@angular/animations'
import { UtilsComponent } from '../../utils/utils.component'
import { AuthenticationService, Usuario } from '../../Api/Services/Authentication/authentication.service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  animations:[
    trigger('fadein',[
      state('void',style({opacity:0, left:'-1000px'})),
      transition('void =>*', [
        style({opacity:1}),
        animate('600ms ease-out', style({left:0}))
      ])
    ])
  ]
})
export class RegistroPage implements OnInit {
phoneNumber = ""
UID = "";
Nombre = "";
Dia:number;
Mes:number;
Anio:number;
Dias:any[]
Meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto', 'Septiembre','Octubre','Noviembre', 'Diciembre'];
Anios:any[]
Usuario: Usuario

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private utils: UtilsComponent,
    private AuthService: AuthenticationService,
    private storage: Storage,
    private events: Events
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.phoneNumber = params["phoneNumber"]
      this.UID = params["uid"]
    })
    this.GeneraDias()
    this.GeneraAnios()
  }

  close(){
    this.navCtrl.back()
  }

  GeneraDias(){
    var aux=[]
    var max = 31
    if(this.Mes >= 0){
      
      if(this.Mes === 3 || this.Mes === 5 || this.Mes === 8 || this.Mes === 10){
        max= 30
      }else if(this.Mes === 1){
        max = 29
      }
    }

    for(var i = 1; i <= max; i ++){
      aux.push(i)
    }
    this.Dias = aux
  }

  GeneraAnios(){
      var years=[]
      for(var i = 2019; i >= 1900; i --){
        years.push(i)
      }
      this.Anios = years
  }

  RegistrarUsuario(){
    if(this.Nombre != "" && this.Dia > 0 && this.Mes > 0 && this.Anio > 0){
      var FechaNacimiento = new Date(this.Anio , this.Mes, this.Dia)
        this.Usuario = {
          IdUsuario: 0,
          Nombre: this.Nombre,
          UID: this.UID,
          registradoEl: new Date(),
          FechaNacimiento: FechaNacimiento,
          telefono: this.phoneNumber
        }
        this.AuthService.registrarUsuario({usuario:this.Usuario}).subscribe(res=>{
          this.storage.set('Usuario',this.Usuario)
          this.utils.showToast('Registrado Correctamente')
          this.navCtrl.navigateRoot('')
          this.events.publish('user:register')
         }).unsubscribe
        //(()=>{
        //   this.utils.showToast(error)
        // })
    }else{
      this.utils.alertGenerico('Error','Para continuar es necesario que complete el formulario')
    } 
  }

}
