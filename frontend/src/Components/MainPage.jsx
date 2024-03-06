import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import routes from '../hooks/routes';
import ChannelsSection from './ChannelsSection.jsx';
import MessagesSection from './MessagesSections.jsx';
import { actions as ChannelsActions } from '../slices/channelsSlice.jsx';

const getAuthHeader = () => {
  const userToken = JSON.parse(localStorage.getItem('user'));

  if (userToken) {
    return { Authorization: `Bearer ${userToken}` };
  }

  return {};
};

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChannels = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      dispatch(ChannelsActions.setInitialState(data));
    };

    fetchChannels();
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelsSection />
        </div>
        <div className="col p-0 h-100">
          <MessagesSection />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
