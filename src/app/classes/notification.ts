/**
 * Created by AhmedHt on 22/05/2017.
 */


export class Notification {

  id_user: string;
  id?: string;
  numberNotifications?: number;

  checked?: boolean;

  constructor(id_user: string, id?: string, numberNotifications?: number, checked?: boolean) {
    this.id = id;
    this.id_user = id_user;
    this.numberNotifications = numberNotifications;
    this.checked = checked;
  }
}
