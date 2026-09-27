import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ADD TO CART
  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {

      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity,
        },
      ];
    });
  };


  // REMOVE PRODUCT
  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };


  // UPDATE QUANTITY
  const updateQuantity = (productId, quantity) => {

    if (quantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };


  // CLEAR CART
  const clearCart = () => {
    setCart([]);
  };


  // TOTAL ITEMS
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );


  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  return useContext(CartContext);
}