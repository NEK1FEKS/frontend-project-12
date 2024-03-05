import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.jsx';
import messagesReducer from './messagesSlice.jsx';

export default configureStore({
  reducer: {
    chatChannels: channelsReducer,
    chatMessages: messagesReducer,
  },
});
