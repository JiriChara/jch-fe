import { shallow } from 'vue-test-utils';
import Router from 'vue-router';

import App from '@/App';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

describe('App', () => {
  let component;

  beforeEach(() => {
    const $Progress = {
      start() {},
      finish() {},
    };

    const router = new Router({
      mode: 'history',
    });

    component = shallow(App, {
      router,
      mocks: {
        $Progress,
      },
    });
  });

  it('is called app', () => {
    expect(component.name()).toBe('app');
  });

  it('is div component', () => {
    expect(component.is(App)).toBe(true);
    expect(component.is('div#app')).toBe(true);
  });

  it('contains Footer', () => {
    expect(component.contains(Footer)).toBe(true);
  });

  it('contains Navbar', () => {
    expect(component.contains(Navbar)).toBe(true);
  });
});
