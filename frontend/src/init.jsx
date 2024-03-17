import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import store, { actions } from './slices/index.js';
import App from './Components/App.js';
import resources from './locales/index.js';
import { ApiContext } from './contexts';

const init = async (socket) => {
  const api = {
    sendMessage: (...args) => socket.emit('newMessage', ...args),
    createChannel: (...args) => new Promise((resolve, reject) => {
      const [channelData] = args;
      socket.timeout(3000).emit('newChannel', { ...channelData, createdBy: socket.id }, (error, response) => {
        const { data } = response;
        if (error) {
          console.error(error);
          reject();
        }
        resolve(data);
      });
    }),
    removeChannel: (...args) => socket.emit('removeChannel', ...args),
    renameChannel: (...args) => socket.emit('renameChannel', ...args),
  };

  socket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessage({ message: payload }));
  });
  socket.on('newChannel', (payload) => {
    const { createdBy } = payload;
    store.dispatch(actions.addChannel({ channel: payload }));
    if (createdBy === socket.id) {
      store.dispatch(actions.setCurrentChannel(payload.id));
    }
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(actions.removeChannel({ channelId: payload.id }));
  });
  socket.on('renameChannel', (payload) => {
    const { id, name } = payload;
    store.dispatch(actions.renameChannel({ channelId: id, channelName: name }));
  });

  const i18n = i18next.createInstance();

  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ApiContext.Provider value={api}>
          <App />
        </ApiContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
