import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  //Variables
  itemIdToPass: string;

  
  constructor(private fireStore: AngularFirestore) { }


  //Pass ItemId to service
  public passItemId(itemId: string) {
    this.itemIdToPass = itemId;
  }


  //Retrieve ItemId from service
  public retrieveItemId() {
    return this.itemIdToPass;
  }


  //Get all Items from FireStore
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


  //Get an Item knowing it's id
  public getItemById(id: string): Observable<Item> {
    return this.fireStore.collection('items/').doc<Item>(id).valueChanges();
  }


  //Add a item to FireStore
  public submitItem(item: Item): Promise<DocumentReference> {
    return this.fireStore.collection('items/').add(item);
  }


}
