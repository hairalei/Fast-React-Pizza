import { RootState } from '../../store';

export const getUsername = (state: RootState) => state.user.username;
