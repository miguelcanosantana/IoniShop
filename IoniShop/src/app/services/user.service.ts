import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../model/item';
import { VoidItem } from '../model/void-item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  fireId: String;


  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore
    ) {}

  /*
  //Add an Item (a void one, knowing the Item's Id) to the User's Cart in FireStore
  public addToCart(itemId: String): Promise<DocumentReference> {

    //Check first if the item is already on the cart, so units can be added
    let tempCart

    let tempVoidItem: VoidItem = {

    }

    return this.fireStore.collection('users/' + this.fireId + '/cart').add(item);
  }


  //Get User's Cart from FireStore
  public getCart(): Observable<VoidItem[]> {
    return this.fireStore.collection<VoidItem>('users/' + this.fireId + '/cart').snapshotChanges().pipe(
      map(
        snaps => snaps.map(
          snap => <VoidItem>{
            itemId: snap.payload.doc.id,
            ...snap.payload.doc.data()
          }
        )
      )
    );
  }*/


  //Login FireAuth
  public login(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }


  //Logout FireAuth
  public logout(): Promise<void> {
    return this.fireAuth.signOut();
  }


  //Get Current User Logged FireAuth
  public getCurrentUser(): Observable<firebase.default.User> {
    return this.fireAuth.authState;
  }


  //Create User in FireAuth
  public createUser(email: string, password: string):Promise<firebase.default.auth.UserCredential> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }


  //Reset User password using Email FireAuth
  public resetPassword(email: string): Promise<void> {
    return this.fireAuth.sendPasswordResetEmail(email);
  }
}
