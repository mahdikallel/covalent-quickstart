import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';
import {User} from './clients/settings/user/User';

@Injectable()
export class CurentUserService {

  checkUser(): boolean {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  userConnexion(user): boolean {
    if (!this.checkUser()) {
      localStorage.setItem('currentUser', user.id.toString());
      // localStorage.setItem('role',"admin");
      return true;
    }
    return false;

  }

  userDeconnexion(): boolean {
    if (this.checkUser()) {
      localStorage.removeItem('currentUser');
      return true;
    }
    return false;
  }
}
