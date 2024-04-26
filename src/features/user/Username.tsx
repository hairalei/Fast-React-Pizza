import { useSelector } from 'react-redux';
import { getUsername } from './userSelectors';

function Username() {
  const username = useSelector(getUsername);

  if (!username) return;

  return (
    <div className='hidden text-sm font-semibold md:block'>{username}</div>
  );
}

export default Username;
