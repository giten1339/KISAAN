export default function FarmReducer(state, action) {
   switch (action.type) {
      case "CHANGE_CART_STATE":
         return {
            ...state,
            hideRightSidebar: action.payload.hideRightSidebar,
            sidebarType: action.payload.sidebarType,
         };

      case "MANAGE_CART":
         return {
            ...state,
            cart: action.payload,
         };

      case "SHOW_ALERT":
         return {
            ...state,
            alert: action.payload,
         };

      case "CHANGE_SESSION_STATE":
         return {
            ...state,
            session: action.payload,
         };

      case "GET_ALL_PRODUCTS":
         return {
            ...state,
            products: action.payload,
         };

      case "CHANGE_DROPDOWN_STATE":
         return {
            ...state,
            hideDropdown: action.payload,
         };

      case "MANAGE_WISHLIST":
         return {
            ...state,
            wishlist: action.payload,
         };
   }
}
