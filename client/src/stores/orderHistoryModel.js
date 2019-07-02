import {
  action
} from "easy-peasy";

const order = {
  order: [],
  addToOrder: action((state, order) => {
    state.order = [...state.order, order]
  })
};

export default order