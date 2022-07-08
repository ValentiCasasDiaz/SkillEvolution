import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Badge } from '../models/badge.model';


@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  // Crea las insignias del usuario segun el tipo
  createBadges(userId: string, badges) {
    this.firestore.collection('badges').doc(userId).set(badges);
  }

  // Devuelve las insignias del usuario y cualquier cambio que en ellas pase
  getBadges(userId: string) {
    return this.firestore.collection('badges').doc(userId).snapshotChanges();
  }

  initializeHardSkillBadges(userId: string): void {
    const hardSkills = [];
    const badgesUrl: string = 'assets/images/badges/';

    for (let i = 1; i <= 5; i++) {
      // Firebase necesita trabajar con objetos javascript, nada de modelos ni objetos tipados.
      hardSkills.push({id: `Dart ${i}`, img: `${badgesUrl}Dart ${i}.png`, owned: false});
      hardSkills.push({id: `Flutter ${i}`, img: `${badgesUrl}Flutter ${i}.png`, owned: false});
      hardSkills.push({id: `CSharp ${i}`, img: `${badgesUrl}CSharp ${i}.png`, owned: false});
      hardSkills.push({id: `Unity ${i}`, img: `${badgesUrl}Unity ${i}.png`, owned: false});
      hardSkills.push({id: `Firebase ${i}`, img: `${badgesUrl}Firebase ${i}.png`, owned: false});
    }

    this.createBadges(userId, { 'hardSkills': hardSkills });
  }

}
