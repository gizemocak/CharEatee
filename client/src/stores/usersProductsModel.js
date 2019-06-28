import { action, thunk } from "easy-peasy";

export default {
  pins: [],
  // Thunks
  fetchPins: thunk(async actions => {
    const res = await fetch('http://localhost:8080/api/stores', {
      method: 'get',
      headers: {'Content-Type':'application/json'},
     })
    const pins = await res.json();

    actions.setPins(pins);
  }),
  setPins: action((state, pins) => {
    state.pins = pins;
  }),
};
