import {
  action,
  thunk,
  computed
} from "easy-peasy";

const usersProducts = {
  pins: [],
  stores: [],
  // Thunks
  fetchPins: thunk(async actions => {
    const res = await fetch('http://localhost:8080/api/stores', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const pins = await res.json();

    actions.setPins(pins);
  }),
  fetchStores: thunk(async actions => {
    const res = await fetch('http://localhost:8080/api/v2/stores', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const stores = await res.json();

    actions.setStores(stores);
  }),
  setPins: action((state, pins) => {
    state.pins = pins;
  }),
  setStores: action((state, stores) => {
    state.stores = stores;
  }),
  filteredStores: computed(state =>
    state.stores.filter((store) => store.type === 'Grocer/Restaurant' && store.products && store.products.some(item => !item.deleted_at))
  )
};

export default usersProducts