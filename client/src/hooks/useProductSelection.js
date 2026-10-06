import { useState } from 'react';
import { COMMERCE } from '../constants/site';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function useProductSelection(product) {
  const { addToCart, openCart } = useCart();
  const { showToast } = useToast();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const maxQuantity = Math.min(COMMERCE.maxQuantityPerItem, product.stock);

  const selectSize = (value) => {
    setSize(value);
    setError('');
  };

  // feedback: 'drawer' opens the bag, 'none' stays silent (used by Buy now, which navigates away)
  const submit = ({ feedback = 'drawer' } = {}) => {
    if (product.stock === 0) return false;
    if (!size) {
      setError('Select a size to continue.');
      return false;
    }
    const added = addToCart(product, { size, color, quantity });
    if (!added) showToast('This item could not be added', 'error');
    else if (feedback === 'drawer') openCart();
    return added;
  };

  return { color, setColor, size, selectSize, quantity, setQuantity, maxQuantity, error, submit };
}
