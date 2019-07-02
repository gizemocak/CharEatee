import {
  action
} from "easy-peasy";

const order = {
  order: [],
  addToOrder: action((state, order) => {
    state.order = [...state.order, order]
  }),
  fetchOrder: thunk(async actions => {
    const res = await fetch('http://localhost:8080/api/orders', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const orders = await res.json();

    actions.addToOrder(orders);
  }),
};

export default order