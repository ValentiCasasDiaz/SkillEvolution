import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Badge } from '../models/badge.model';

import * as CONSTS from '../global/constants';


@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  // Crea las insignias del usuario segun el tipo
  createBadges(userId: string, badges) {
    this.firestore.collection(CONSTS.COLLECTION_BADGES).doc(userId).set(badges);
  }

  // Devuelve las insignias del usuario y cualquier cambio que en ellas pase
  getBadges(userId: string) {
    return this.firestore.collection(CONSTS.COLLECTION_BADGES).doc(userId).snapshotChanges();
  }

  initializeHardSkillBadges(userId: string): void {
    const hardSkills = [];

    for (let i = 1; i <= 5; i++) {
      // Firebase necesita trabajar con objetos javascript, nada de modelos ni objetos tipados.
      hardSkills.push({
        id: `${CONSTS.BADGE_NAME_DART} ${i}`,
        img: `${CONSTS.PATH_TO_BADGES}${CONSTS.BADGE_NAME_DART} ${i}.png`,
        owned: false
      });
      hardSkills.push({
        id: `${CONSTS.BADGE_NAME_FLUTTER} ${i}`,
        img: `${CONSTS.PATH_TO_BADGES}${CONSTS.BADGE_NAME_FLUTTER} ${i}.png`,
        owned: false
      });
      hardSkills.push({
        id: `${CONSTS.BADGE_NAME_CSHARP} ${i}`,
        img: `${CONSTS.PATH_TO_BADGES}${CONSTS.BADGE_NAME_CSHARP} ${i}.png`,
        owned: false
      });
      hardSkills.push({
        id: `${CONSTS.BADGE_NAME_UNITY} ${i}`,
        img: `${CONSTS.PATH_TO_BADGES}${CONSTS.BADGE_NAME_UNITY} ${i}.png`,
        owned: false
      });
      hardSkills.push({
        id: `${CONSTS.BADGE_NAME_FIREBASE} ${i}`,
        img: `${CONSTS.PATH_TO_BADGES}${CONSTS.BADGE_NAME_FIREBASE} ${i}.png`,
        owned: false
      });
    }

    const key = CONSTS.BADGES_HARD_SKILLS;
    this.createBadges(userId, { key: hardSkills });
  }

}
