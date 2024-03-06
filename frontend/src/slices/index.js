import { configureStore } from '@reduxjs/toolkit';
import channelsReducer, { actions as channelsActions } from './channelsSlice.jsx';
import messagesReducer, { actions as messagesActions } from './messagesSlice.jsx';

const actions = {
  ...channelsActions,
  ...messagesActions,
};

export { actions };
export default configureStore({
  reducer: {
    chatChannels: channelsReducer,
    chatMessages: messagesReducer,
  },
});
