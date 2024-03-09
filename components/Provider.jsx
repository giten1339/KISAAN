import { CartContextProvider } from "./context/CartContext";
import { FarmContextProvider } from "./context/FarmContext";
import { WishlistContextProvider } from "./context/WishlistContext";
export default function Provider({ children, session }) {
   return (
      <div>
         <FarmContextProvider>
            <WishlistContextProvider session={session}>
               <CartContextProvider session={session}>
                  {children}
               </CartContextProvider>
            </WishlistContextProvider>
         </FarmContextProvider>
      </div>
   );
}
