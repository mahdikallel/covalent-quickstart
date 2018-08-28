import {RoleImpl} from './role';
export enum GenderEnum {
  Male = <any> 'male',
  Female = <any> 'female'
}
export class UserImpl {

  dateOfBirth: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  gender: GenderEnum;
  phone: string;
  id: string;
  roles?: Array<RoleImpl>;

  constructor(username: string, firstname: string, lastname: string, password: string,
              email: string, dateOfBirth?: string, gender?: GenderEnum, phone?: string, id?: string, roles?: Array<RoleImpl>) {
    this.id = id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.phone = phone;
    this.roles = roles;
  }

}
