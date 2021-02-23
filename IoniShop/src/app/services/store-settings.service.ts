import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreConfig } from '../model/store-config';

@Injectable({
  providedIn: 'root'
})
export class StoreSettingsService {

  //Variables
  defaultSettings: StoreConfig = {
    name: 'Store',
    favicon: 'https://upload.wikimedia.org/wikipedia/commons/7/77/OSP_Store_%28128px%29.png',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/OSP_Store_%28128px%29.png',
    mainColor: '#3880ff',
    secondaryColor: '#3dc2ff',
    roundType: 1
  }


  constructor(private fireStore: AngularFirestore) { }


  //Add Store default settings (The first time or if they are deleted)
  public addSettings(): Promise<DocumentReference> {
    return this.fireStore.collection('store-settings/').add(this.defaultSettings);
  }


  //Get an Array with all settings
  public getSettings(): Observable<StoreConfig[]> {

      return this.fireStore.collection<StoreConfig>('store-settings/').snapshotChanges()
      .pipe(
        map(
          snaps => snaps.map(
            snap => <StoreConfig>{
              itemId: snap.payload.doc.id,
              ...snap.payload.doc.data()// as StoreConfig
            }
          )
        )
      );
  }

}
