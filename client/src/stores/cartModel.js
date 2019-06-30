import { action} from "easy-peasy";

const cart = {
  cart: [],
  addToCart: action((state, lineItem) => {
     state.cart = [...state.cart, lineItem]
  }),
  removeFromCart: action((state, index) => {
    let newCart = [...cart]
    newCart.splice(index, 1)
    state.cart = newCart
  })
};

export default cart
