import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import ChannelsSection from './ChannelsSection.jsx';
import MessagesSection from './MessagesSections.jsx';
import { actions as ChannelsActions } from '../slices/channelsSlice.jsx';
import Modal from './modals/Modal.jsx';
import { useAuth } from '../hooks/index.jsx';

const MainPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const channels = useSelector((state) => state.chatChannels.channels);
  const currentChannelId = useSelector((state) => state.chatChannels.currentChannelId);

  const [localCurrentChannelId, setLocalCurrentChannelId] = useState(currentChannelId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.dataApiPath(), { headers: auth.getAuthHeader() });
        dispatch(ChannelsActions.setInitialState(data));
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }
        if (error.response?.status === 401) {
          navigate(routes.loginPagePath());
        } else {
          toast.error(t('errors.network'));
        }
      }
    };

    fetchData();
  }, [dispatch, auth, navigate, t]);

  useEffect(() => {
    const generalChannel = channels.find((channel) => channel.name === 'general');
    if (generalChannel && localCurrentChannelId !== currentChannelId
      && !channels.find((channel) => channel.id === currentChannelId)) {
      dispatch(ChannelsActions.setCurrentChannel(generalChannel.id));
      setLocalCurrentChannelId(generalChannel.id);
    }
  }, [dispatch, channels, currentChannelId, localCurrentChannelId]);

  useEffect(() => {
    const messageBox = document.getElementById('message-box');
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight;
    }
  }, [currentChannelId]);
  return (
    <>
      <Modal />
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
    </>
  );
};

export default MainPage;
