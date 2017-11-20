import engine from 'store/src/store-engine';
import localStorage from 'store/storages/localStorage';

const storages = [
  localStorage,
];

const plugins = [];

export default engine.createStore(storages, plugins);
