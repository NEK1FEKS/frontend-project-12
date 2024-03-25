import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import init from './init.jsx';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'testenv',
};

const app = async () => {
  const soket = io();
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const vdom = await init(soket);
  root.render(
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        {vdom}
      </ErrorBoundary>
    </RollbarProvider>,
  );
};

app();
