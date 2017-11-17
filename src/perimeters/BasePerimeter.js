import { Perimeter } from 'vue-kindergarten';


export default class BasePerimeter extends Perimeter {
  isLoggedIn() {
    return !!this.child;
  }

  isAdmin() {
    return this.isLoggedIn() && this.child.role === 'admin';
  }
}
