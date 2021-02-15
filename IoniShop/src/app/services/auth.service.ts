import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Variables
  userId: String;

  constructor(
    private fireAuth: AngularFireAuth
  ) { }

  
  //Create User
  public createUser(email: string, password: string):Promise<firebase.default.auth.UserCredential> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }


  //User Login 
  public loginUser(email: string, password: string
    ): Promise<firebase.default.auth.UserCredential> {
      return this.fireAuth.signInWithEmailAndPassword(email, password);
  }


  //Get User
  public getCurrentUser(): Observable<firebase.default.User> {
    return this.fireAuth.authState;
  }

}
