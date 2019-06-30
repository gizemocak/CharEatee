import React, { useEffect , useState} from 'react';
import NavBar from './NavBar';
import {useStoreState, useStoreActions } from "easy-peasy";
import Button from "react-bootstrap/Button";

export default function Profile (props) {
  const usersInfo = useStoreState(state => state.pins);

  const fetchUserInfo = useStoreActions(actions => actions.fetchPins);
  const [cart, setCart] = useState([])
  const [clicked, updateClickedButton] = useState(false)

  useEffect(() => {
    fetchUserInfo()
  },[])

  const handleAddToCart = (e) => {
  let item = e.target.value
  
  console.log('item', item)
  if(!cart.includes(item)){
    const newCart = [...cart, item]
    console.log('newcart', newCart)
    setCart(newCart)
  } else {
    console.log('cart1', cart)
    let index = cart.indexOf(item)
    let newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
  }

  if(clicked){
    updateClickedButton(true)
  } else {
    updateClickedButton(false)
  }

  }

  let user = JSON.parse(localStorage.getItem('user'))
    return (
      <>
      <NavBar/>
      <div>cart: {cart.length} </div>
      <h3> {user.name} donated:</h3>
      
      <ul>
      {user.type === "Grocer/Restaurant" && usersInfo && usersInfo.map(item => {
         if(item.user_id === Number(props.match.params.id))
         {
          return (
          <div>
          <li>{item.name}  {item.quantity} {item.unit} 
          <Button value={item.id} onClick={handleAddToCart} name="add to cart"></Button></li>
          </div>
          )
        }
      })}
      </ul>
    </>
    );
}
