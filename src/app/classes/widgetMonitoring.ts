/**
 * Created by AhmedHt on 20/05/2017.
 */


export class WidgetMonitoring {
  name?: string;

  position?: string;

  id?: string;

  id_user: string;

  constructor(id_user: string, id?: string, name?: string, position?: string) {
    this.name = name;
    this.position = position;
    this.id = id;
    this.id_user = id_user;
  }

}
