/**
 * Created by AhmedHt on 08/06/2017.
 */
export class Contact {

  emailFrom?: string;

  emailTo?: string;

  message?: string;

  id?: number;

  checked?: boolean;

  constructor(id?: number, emailFrom?: string, emailTo?: string, message?: string, checked?: boolean) {
    this.id = id;
    this.emailFrom = emailFrom;
    this.emailTo = emailTo;
    this.message = message;
    this.checked = checked;
  }
}
