/**
 * Created by AhmedHt on 09/05/2017.
 */

export class WidgetNotifications {

  name?: string;

  position?: string;

  id?: string;

  id_user: string;

  constructor(id_user: string, id?: string, name?: string, position?) {
    this.id_user = id_user;
    this.id = id;
    this.name = name;
    this.position = position;

  }

}
