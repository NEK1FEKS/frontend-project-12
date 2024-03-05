import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchChannelsList: (state, { payload }) => {
      state.channels = [...payload.channels];
      state.currentChannelId = payload.currentChannelId;
    },
  },
});

export const { fetchChannelsList } = channelsSlice.actions;
export default channelsSlice.reducer;
