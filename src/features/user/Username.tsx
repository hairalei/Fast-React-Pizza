import { useSelector } from 'react-redux';
import { selectUsername } from './userSelectors';

function Username() {
  const username = useSelector(selectUsername);

  if (!username) return;

  return (
    <div className='hidden text-sm font-semibold md:block'>{username}</div>
  );
}

export default Username;
