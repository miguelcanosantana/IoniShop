import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../model/item';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //Variables
  fireId: string;


  constructor(
    private userService: UserService,
    private fireStore: AngularFirestore
  ) { 
  
    this.userService.getCurrentUser().subscribe(
      data => this.fireId = data.uid
    )
  }


  //Add an Item (knowing the Item and User's Id) to the User's Cart in FireStore
  public addToCart(item: Item): Promise<DocumentReference> {
    return this.fireStore.collection('users/' + this.fireId + '/cart').add(item);
  }


  //Get User's Cart from FireStore
  public getCart(): Observable<Item[]> {
    return this.fireStore.collection<Item>('users/' + this.fireId + '/cart').snapshotChanges().pipe(
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
}
