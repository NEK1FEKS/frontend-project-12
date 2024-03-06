import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setInitialState: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channels = [...channels];
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel: (state, { payload }) => {
      const channelId = payload;
      state.currentChannelId = channelId;
    },
    addChannel: (state, { payload }) => {
      const { channel } = payload;
      state.channels.push(channel);
    },
    removeChannel: (state, { payload }) => {
      const { channelId } = payload;
      state.channels = state.channels.filter(({ id }) => id !== channelId);
    },
    renameChannel: (state, { payload }) => {
      const { channelId, channelName } = payload;
      const channel = state.channels.filter(({ id }) => id === channelId);
      channel.name = channelName;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
