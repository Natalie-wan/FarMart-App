import { useSelector, useDispatch } from 'react-redux';
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectItemCount,
  selectTotal
} from '@/redux/cartSlice';

const useCart = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectCartItems);
  const itemCount = useSelector(selectItemCount);
  const total = useSelector(selectTotal);

  return {
    items,
    itemCount,
    total,
    addItem: (animal) => dispatch(addItem(animal)),
    removeItem: (id) => dispatch(removeItem(id)),
    updateQuantity: (id, quantity) => dispatch(updateQuantity({ id, quantity })),
    clearCart: () => dispatch(clearCart())
  };
};

export default useCart;
