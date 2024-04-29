/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { type CreateOrder } from '../../utils/types';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getUsername } from '../user/userSelectors';
import { getCart, getTotalCartPrice } from '../cart/cartSelector';
import EmptyCart from '../cart/EmptyCart';
import store, { RootState } from '../../store';
import { clearCart } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const dispatch = useDispatch();
  // const username = useSelector(getUsername);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAdress,
  } = useSelector((state: RootState) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData() as Errors;

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (cart.length === 0) return <EmptyCart />;

  const handleFetchAddress = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(fetchAddress() as any);
  };

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      <Form method='POST'>
        <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            defaultValue={username}
            className='input grow'
            type='text'
            name='customer'
            required
          />
        </div>

        <div className='flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='w-full input' type='tel' name='phone' required />
            {formErrors?.phone && (
              <p className='p-2 mt-2 text-xs text-red-700 bg-red-100 rounded-md'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='relative flex flex-col gap-2 mb-5 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              className='w-full input'
              type='text'
              name='address'
              disabled={isLoadingAddress}
              required
              defaultValue={address}
            />

            {addressStatus === 'error' && (
              <p className='p-2 mt-2 text-xs text-red-700 bg-red-100 rounded-md'>
                {errorAdress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className='absolute right-[3px] z-50 top-[35px] sm:right-[5px] sm:top-[5px]'>
              <Button
                disabled={isLoadingAddress}
                type='small'
                onClick={handleFetchAddress}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className='flex items-center gap-5 mb-12'>
          <input
            className='w-6 h-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority.toString()}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className='font-medium' htmlFor='priority'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <input
            type='hidden'
            name='position'
            value={
              position.longitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button type='primary' disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

type FormRequest = {
  formData: () => Promise<FormData>;
};

type Data = {
  customer: string;
  phone: string;
  address: string;
  priority?: string;
  cart: string;
};

type Errors = {
  phone?: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: { request: FormRequest }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as Data;

  const order: CreateOrder = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  console.log(order);

  const errors: Errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
