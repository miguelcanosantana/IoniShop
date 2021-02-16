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
    ) {
  }
  

  //Create User inside DB knowing it's Uid
  public createUser(givenName: string, givenLast: string, givenAdmin: boolean) : Promise<DocumentReference> {

    this.authService.getCurrentUser().subscribe(
      data => this.userId = data.uid
    )
    //
    let tempUser: User = {
      fireId: "5555",
      name: givenName,
      surname: givenLast,
      isAdmin: givenAdmin
    }

    return this.fireStore.collection('users/' + this.userId + '/info').add(tempUser);
  }


}
