/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as ChannelsActions } from './channelsSlice.jsx';

const initialState = {
  messages: [],
};
const messagesSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      const { message } = payload;
      state.messages = [...state.messages, message];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ChannelsActions.setInitialState, (state, { payload }) => {
        const { messages } = payload;
        state.messages = [...messages];
      })
      .addCase(ChannelsActions.removeChannel, (state, { payload }) => {
        const { channelId } = payload;
        state.messages = state.messages.filter((message) => message.channelId !== channelId);
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
