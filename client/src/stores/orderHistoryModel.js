import {
  action,
  thunk
} from "easy-peasy";

const order = {
  order: [],
  addToOrder: action((state, order) => {
    state.order = [...state.order, order]
  }),
  fetchOrders: thunk(async (actions, orderId) => {
    const res = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const orders = await res.json();

    actions.addToOrder(orders);
  }),
};

export default order