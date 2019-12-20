import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { direcciones } from '../direcciones.service';

@Injectable()

export class StoreDireccionesService{
    
    constructor(){}

    private readonly _direcciones = new BehaviorSubject<[direcciones]>
        ([{
            IdDireccion: 0,
            IdUsuario:0 ,
            Calle: '',
            Numero: '',
            Latitud: 0,
            Longitud: 0,
            selected: 0
        }])
        
        readonly direcciones$ = this._direcciones.asObservable();

        readonly direccion$ = this.direcciones$;

        get direcciones(): [direcciones]{
            return this._direcciones.getValue();
        }

        set direcciones(val: [direcciones]){
            this._direcciones.next(val)
            val.forEach(dir=>{
                if(dir.selected === 1){
                    this.selectedDir = dir
                }
            })
        }

    private readonly _selectedDir = new BehaviorSubject<direcciones>
        ({
            IdDireccion: 0,
            IdUsuario:0 ,
            Calle: '',
            Numero: '',
            Latitud: 0,
            Longitud: 0,
            selected: 0
        })

    
    readonly selectedDir$ = this._selectedDir.asObservable();

    readonly selectedDireccion$ = this.selectedDir$;

    get selectedDir(): direcciones{
        return this._selectedDir.getValue();
    }

    set selectedDir(val: direcciones){
        this._selectedDir.next(val)
    }

    /*async changeDirecciones(direcciones: direcciones){
        this.direcciones = direcciones
    }*/
}