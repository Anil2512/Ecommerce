import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


const WishlistContext = createContext();


export function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState(() => {

    try {

      const saved =
        localStorage.getItem("wishlist");

      return saved
        ? JSON.parse(saved)
        : [];

    } catch (error) {

      console.error(
        "Wishlist Load Error:",
        error
      );

      return [];

    }

  });


  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

  }, [wishlist]);


  const toggleWishlist = (product) => {

    setWishlist((prev) => {

      const exists = prev.some(
        (item) => item.id === product.id
      );


      if (exists) {

        return prev.filter(
          (item) => item.id !== product.id
        );

      }


      return [
        ...prev,
        product
      ];

    });

  };


  const isInWishlist = (productId) => {

    return wishlist.some(
      (item) => item.id === productId
    );

  };


  const removeFromWishlist = (productId) => {

    setWishlist((prev) =>
      prev.filter(
        (item) => item.id !== productId
      )
    );

  };


  const clearWishlist = () => {

    setWishlist([]);

  };


  return (

    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >

      {children}

    </WishlistContext.Provider>

  );

}


export function useWishlist() {

  return useContext(WishlistContext);

}