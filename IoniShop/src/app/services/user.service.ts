import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { User } from '../model/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Variables
  userId: string;
  name: string;
  surname: string;
  isAdmin: boolean;

  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService
    ) { }

}
