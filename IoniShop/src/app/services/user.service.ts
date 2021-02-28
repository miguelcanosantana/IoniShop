import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../model/item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore
    ) {}


  /*-------------------- CART --------------------*/

    //Add an Item (knowing the Item and User's Id) to the User's Cart in FireStore
    public addToCart(fireId: string, item: Item): Promise<DocumentReference> {
      return this.fireStore.collection('users/' + fireId + '/cart').add(item);
    }


    //Get User's Cart from FireStore
    public getCart(fireId: string): Observable<Item[]> {
      return this.fireStore.collection<Item>('users/' + fireId + '/cart/').snapshotChanges().pipe(
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


  /*-------------------- FIRE AUTH --------------------*/

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
