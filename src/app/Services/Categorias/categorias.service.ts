import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Categoria {
  Id: number;
  Categoria: string;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private Categorias:AngularFirestoreCollection<Categoria>;
  private CategoriasFB: Observable<Categoria[]>;

  constructor(
    private db: AngularFirestore
    ) { 
    this.Categorias = this.db.collection<Categoria>('Categorias', ref=> ref.orderBy('Id'));

    this.CategoriasFB = this.Categorias.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const Id = a.payload.doc.id;
          return{Id, ...data};
        })
      })
    )
  }

  getCategorias(){
    return this.CategoriasFB
  }

  getCategoria(id){
    return this.Categorias.doc<Categoria>(id).valueChanges();
  }
/*
  updateCategoria(categ: Categoria, id: string) {
    return this.Categorias.doc(id).update(categ);
  }
 
  addCategoria(categ: Categoria) {
    return this.Categorias.add(categ);
  }
 
  removeCategoria(id) {
    return this.Categorias.doc(id).delete();
  }*/
}
