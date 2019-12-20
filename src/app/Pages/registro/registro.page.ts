import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Events, NavController } from '@ionic/angular';
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
Dia:number=-1;
Mes:number=-1;
Anio:number=-1;
Dias:any[]
Meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto', 'Septiembre','Octubre','Noviembre', 'Diciembre'];
Meses30=[3,5,8,10];
Meses31=[0,2,4,6,7,9,11]
Anios:any[]
Usuario: Usuario

  constructor(
    private route: ActivatedRoute,
    private utils: UtilsComponent,
    private AuthService: AuthenticationService,
    private storage: Storage,
    private events: Events,
    private location: Location,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.phoneNumber = params["phoneNumber"]
      this.UID = params["uid"]
    })
    this.GeneraDias(31)
    this.GeneraAnios()
  }

  close(){
    this.location.back();
   // this.navCtrl.back()
  }

  GeneraDias(max){
    var aux=[]
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
    if(this.Nombre != "" && this.Dia > -1 && this.Mes > -1 && this.Anio > -1){
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

  ChangeYear(){
    if(this.Mes === 1){
      this.validaAnioBisiesto()
    }
  }

  ChangeMonth(){
    if(this.Mes>= 0){
      if(this.Mes === 1){
        if(this.Anio != -1){
          this.validaAnioBisiesto()
        }else{
          this.validaDias(28);
        }
      }
      else if(this.Meses31.includes(this.Mes)){
        this.validaDias(31);
      }else{
        this.validaDias(30);
      }

    }
  }

  validaAnioBisiesto(){
    if(((this.Anio % 4 == 0 && this.Anio % 100 != 0) || (this.Anio % 100 == 0 && this.Anio % 400 == 0))){

      this.validaDias(29);
    }else{
      this.validaDias(28);
    }
    
  }

  validaDias(dias){
    if(this.Dia  >= 1){
      if(this.Dia > dias){
        this.Dia = -1
      }
    }
    this.GeneraDias(dias)
  }

}
