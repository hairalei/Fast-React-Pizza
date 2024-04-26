import { type Cart } from '../../utils/types';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { getUsername } from '../user/userSelectors';
import { getCart } from './cartSelector';
import { clearCart } from './cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const username = useSelector(getUsername);
  const cart = useSelector(getCart);

  function handleClearCart() {
    dispatch(clearCart());
  }

  return (
    <div className='px-4 py-3'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>

      <h2 className='text-xl font-semibold mt-7'>
        {cart.length === 0 ? 'Your cart is empty' : `Your cart, ${username}`}
      </h2>

      {cart.length > 0 && (
        <>
          <ul className='mt-3 border-b divide-y divide-stone-200'>
            {cart.map((item) => (
              <CartItem key={item.pizzaId} item={item} />
            ))}
          </ul>

          <div className='mt-6 space-x-2'>
            <Button type='primary' to='/order/new'>
              Order pizzas
            </Button>

            <Button type='secondary' onClick={handleClearCart}>
              Clear cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
