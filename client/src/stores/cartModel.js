import { action} from "easy-peasy";

const cart = {
  cart: [],
  addToCart: action((state, lineItem) => {
     state.cart = [...state.cart, lineItem]
  }),
  removeFromCart: action((state, newCart) => {
    state.cart = newCart
  })
};

export default cart
