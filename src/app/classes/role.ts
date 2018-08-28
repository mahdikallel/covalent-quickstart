import {AuthorityImpl} from './authority';
export class RoleImpl {

  designation: string;

  description: string;

  authorities?: Array<AuthorityImpl>;

  id?: string;

  constructor(designation: string, description: string, authorities?: Array<AuthorityImpl>, id?: string) {
    this.description = description;
    this.designation = designation;
    this.authorities = authorities;
    this.id = id;
  }
}
