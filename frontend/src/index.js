import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';

import init from './init.jsx';

const app = async () => {
  const soket = io();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await init(soket);
  root.render(vdom);
};

app();
