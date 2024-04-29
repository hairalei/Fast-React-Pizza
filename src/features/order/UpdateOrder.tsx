/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { CompleteOrder } from '../../utils/types';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }: { order: CompleteOrder }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button type='primary'>Make priority</Button>;
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action<T>({ request, params }) {
  const data = { priority: true };

  await updateOrder(params.orderId, data);
  return null;
}
