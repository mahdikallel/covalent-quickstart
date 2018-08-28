/**
 * Created by AhmedHt on 08/05/2017.
 */
export enum EtatEnum {
  Open = <any> 'open',
  Close = <any> 'close'
}
export class WidgetUsers {

  name?: string;

  position?: string;
  id?: string;
  etat: EtatEnum;

  category?: string;

  typeChart?: string;

  id_user: string;

  constructor(idUser: string, id?: string, name?: string, position?: string, etat?: EtatEnum, category?: string, typeChart?: string) {
    this.id_user = idUser;
    this.id = id;
    this.name = name;
    this.position = position;
    this.etat = etat;
    this.category = category;
    this.typeChart = typeChart;
  }
}
