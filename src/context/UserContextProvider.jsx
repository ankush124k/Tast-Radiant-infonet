import React,{useState} from 'react';

import UserContext from './UserContext';

const UserContextProvider=({children})=>{
    const[count,setCount]=useState(0);
    const [cartItems, setCartItems] = useState({});

    const addItemToCart = (id) => {
        setCartItems(prevItems => ({
          ...prevItems,
          [id]: (prevItems[id] || 0) + 1,
        }));
      };

      const removeItemFromCart = (id) => {
        setCartItems(prevItems => {
          const newItems = { ...prevItems };
          if (newItems[id] > 1) {
            newItems[id]--;
          } else {
            delete newItems[id];
          }
          return newItems;
        });
      };

    return (
        <UserContext.Provider value={{count,setCount,addItemToCart,removeItemFromCart,cartItems}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;