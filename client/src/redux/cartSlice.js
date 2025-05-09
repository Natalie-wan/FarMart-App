import {cartSlice} from './cartSlice';

const initialState = {
  items: JSON.parse(localStorage.getItem('farmartCart')) || [],
};

const saveToLocalStorage = (items) => {
  localStorage.setItem('farmartCart', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id: action.payload.id, animal: action.payload, quantity: 1 });
      }

      saveToLocalStorage(state.items);
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToLocalStorage(state.items);
      toast.success('Item removed from cart');
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      if (quantity < 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        const item = state.items.find(item => item.id === id);
        if (item) item.quantity = quantity;
      }
      saveToLocalStorage(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveToLocalStorage([]);
      toast.info('Cart cleared');
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectItemCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.animal.price * item.quantity, 0);

export default cartSlice.reducer;
