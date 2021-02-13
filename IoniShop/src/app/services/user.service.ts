import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }





  //* Create Auth User (send to auth.service) and make a clone with Uid, Name and Surname inside the DB
  private createUser(email: String, password: String, name: String, surname: String) {

  }

}
