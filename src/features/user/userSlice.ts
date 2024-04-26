import { createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

type Position = {
  coords: {
    latitude: string;
    longitude: string;
  };
};

type Address = {
  locality: string;
  city: string;
  postcode: string;
  countryName: string;
};

type FetchAddress = {
  position: {
    latitude: string;
    longitude: string;
  };
  address: string;
};

async function fetchAddress(): Promise<FetchAddress> {
  // 1) We get the user's geolocation position
  const positionObj = (await getPosition()) as Position;
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = (await getAddress(position)) as Address;
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
}

//--------------------------------------------------------------------
type User = {
  username: string;
};

const initialState: User = {
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
