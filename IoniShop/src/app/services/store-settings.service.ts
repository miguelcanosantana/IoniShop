import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreConfig } from '../model/store-config';

@Injectable({
  providedIn: 'root'
})
export class StoreSettingsService {

  defaultSettings: StoreConfig = {
    name: 'Store',
    icon: 'https://www.iconsdb.com/icons/preview/white/cart-79-xxl.png',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/OSP_Store_%28128px%29.png',
    mainColor: '#3880ff',
    secondaryColor: '#3dc2ff',
    roundType: 1
  }


  //Variables
  constructor(private fireStore: AngularFirestore) { }


  //Add or Update Store custom Settings
  public addCustomSettings(settings): Promise<void> {
    return this.fireStore.collection('store-settings').doc("custom").set(settings);
  }


  public getSettings(): Observable<StoreConfig> {
    return this.fireStore.collection('store-settings').doc<StoreConfig>("custom").valueChanges();
  }

  /*
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
  }*/

}
