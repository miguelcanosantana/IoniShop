import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private fireStore: AngularFirestore) { }

  //Get all items from FireStore
  public getItems(): Observable<Item[]> {
    return this.fireStore.collection<Item>('items/').snapshotChanges().pipe(
      map(
        snaps => snaps.map(
          snap => <Item>{
            itemId: snap.payload.doc.id,
            ...snap.payload.doc.data()
          }
        )
      )
    );
  }


  //Add a item to FireStore
  public submitItem(item: Item): Promise<DocumentReference> {
    return this.fireStore.collection('items/').add(item);
  }


}
