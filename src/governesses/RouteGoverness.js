import { HeadGoverness } from 'vue-kindergarten';

export default class RouteGoverness extends HeadGoverness {
  guard(action, { next }) {
    return this.isAllowed(action) ? next() : next({ name: 'articles' });
  }
}
