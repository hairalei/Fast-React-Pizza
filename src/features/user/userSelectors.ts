import { RootState } from '../../store';

export const selectUsername = (state: RootState) => state.user.username;
