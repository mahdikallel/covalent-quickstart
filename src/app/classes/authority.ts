export class AuthorityImpl {

  designation: string;

  description: string;

  id: string;

  constructor(designation: string, description: string, id?: string) {
    this.description = description;
    this.designation = designation;
    this.id = id;
  }
}
