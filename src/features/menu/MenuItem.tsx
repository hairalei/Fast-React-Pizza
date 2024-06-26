import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { Pizza } from '../../utils/types';
import { addItem } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import { getCurrentQtyById } from '../cart/cartSelector';
import UpdateItemQty from '../cart/UpdateItemQty';

function MenuItem({ pizza }: { pizza: Pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQty = useSelector(getCurrentQtyById(id));

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className='flex gap-4 py-2'>
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className='flex flex-col grow pt-0.5'>
        <p className='font-medium'>{name}</p>
        <p className='capitalize'>{ingredients.join(', ')}</p>
        <div className='flex items-center justify-between mt-auto'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium uppercase text-stone-500'>
              Sold out
            </p>
          )}

          {currentQty > 0 ? (
            <div className='flex items-center gap-3 sm:gap-8'>
              <UpdateItemQty pizzaId={id} currentQty={currentQty} />
              <DeleteItem pizzaId={id} />
            </div>
          ) : (
            !soldOut && (
              <Button type='small' disabled={soldOut} onClick={handleAddToCart}>
                Add to cart
              </Button>
            )
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
