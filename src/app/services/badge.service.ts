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

  // Crea o sobrescribe todas las insignias del usuario
  createUpdateBadges(userId: string, badges: any) {
    this.firestore.collection(CONSTS.COLLECTION_BADGES).doc(userId).set(badges);
  }

  // Devuelve las insignias del usuario y cualquier cambio que en ellas que pase
  getBadges(userId: string) {
    return this.firestore.collection(CONSTS.COLLECTION_BADGES).doc(userId).snapshotChanges();
  }

  // Función para inicializar todas las insignias disponibles para el usuario nuevo
  initializeHardSkillBadges(userId: string): void {
    const hardSkills = [];

    for (let i = 1; i <= 5; i++) {
      hardSkills.push(new Badge(`${CONSTS.BADGE_NAME_DART} ${i}`,
                                `${CONSTS.PATH_TO_BADGES}${CONSTS.BADGE_NAME_DART} ${i}.png`,
                                false));


      hardSkills.push(new Badge(`${CONSTS.BADGE_NAME_FLUTTER} ${i}`,
                                `${CONSTS.PATH_TO_BADGES}${CONSTS.BADGE_NAME_FLUTTER} ${i}.png`,
                                false));

      hardSkills.push(new Badge(`${CONSTS.BADGE_NAME_CSHARP} ${i}`,
                                `${CONSTS.PATH_TO_BADGES}${CONSTS.BADGE_NAME_CSHARP} ${i}.png`,
                                false));

      hardSkills.push(new Badge(`${CONSTS.BADGE_NAME_UNITY} ${i}`,
                                `${CONSTS.PATH_TO_BADGES}${CONSTS.BADGE_NAME_UNITY} ${i}.png`,
                                false));

      hardSkills.push(new Badge(`${CONSTS.BADGE_NAME_FIREBASE} ${i}`,
                                `${CONSTS.PATH_TO_BADGES}${CONSTS.BADGE_NAME_FIREBASE} ${i}.png`,
                                false));
    }

    const skills = this.convertArrayToJSArray(CONSTS.BADGES_HARD_SKILLS, hardSkills);
    this.createUpdateBadges(userId, skills);
  }

  convertArrayToJSArray(key: string, array: any): any {
    // Firebase necesita trabajar con objetos javascript, nada de modelos ni objetos tipados.
    const objectArray = array.map((obj)=> {return Object.assign({}, obj)});
    const skills = {};
    skills[key] = objectArray;

    return skills;
  }

}
