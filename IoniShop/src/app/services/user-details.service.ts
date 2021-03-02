import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetails } from '../model/user-details';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  //Variables
  fireId: string;

  constructor(
    private userService: UserService,
    private fireStore: AngularFirestore
  ) {}


  //Add User Details
  public addCustomSettings(userId: string, details: UserDetails): Promise<void> {
    return this.fireStore.collection('users/' + userId + '/details').doc("custom").set(details);
  }
}
