/**
 * Created by AhmedHt on 09/05/2017.
 */

export class WidgetProfile {

  name?: string;

  position?: string;

  parameters?: Array<string>;

  id?: string;

  id_user: string;

  constructor(id_user: string, id?: string, name?: string, position?: string, parameters?: string[]) {
    this.id_user = id_user;
    this.id = id;
    this.name = name;
    this.position = position;
    this.parameters = parameters;

  }

}
