import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private fireStore: AngularFirestore) { }


  //Get all products from FireStore
  public getItems(): Observable<Product[]> {
    return this.fireStore.collection<Product>('products/').snapshotChanges().pipe(
      map(
        snaps => snaps.map(
          snap => <Product>{
            itemId: snap.payload.doc.id,
            ...snap.payload.doc.data()
          }
        )
      )
    );
  }


}
