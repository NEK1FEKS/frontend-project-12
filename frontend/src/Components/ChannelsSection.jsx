import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slices/index.js';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Channel = (props) => {
  const { t } = useTranslation();
  const {
    channel,
    isCurrent,
    handleSelectChannel,
    handleRenameChannel,
    handleRemoveChannel,
  } = props;
  const styles = isCurrent ? 'secondary' : null;

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          type="button"
          variant={styles}
          key={channel.id}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => handleSelectChannel(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown.Toggle split variant={styles} className="flex-grow-0">
        <span className="visually-hidden">{t('channels.menu')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleRemoveChannel(channel.id)}>{t('channels.remove')}</Dropdown.Item>
          <Dropdown.Item onClick={() => handleRenameChannel(channel.id)}>{t('channels.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};
const ChannelsSection = () => {
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.chatChannels);
  const dispatch = useDispatch();
  const handleSelectChannel = (channelId) => {
    dispatch(actions.setCurrentChannel(channelId));
  };

  const handleAddChannel = () => {
    dispatch(actions.openModal({ modalType: 'addChannel' }));
  };
  const handleRemoveChannel = (channelId) => {
    dispatch(actions.openModal({ modalType: 'removeChannel', id: channelId }));
  };
  const handleRenameChannel = (channelId) => {
    dispatch(actions.openModal({ modalType: 'renameChannel', id: channelId }));
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleAddChannel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isCurrent={channel.id === currentChannelId}
            handleSelectChannel={handleSelectChannel}
            handleRemoveChannel={handleRemoveChannel}
            handleRenameChannel={handleRenameChannel}
          />
        ))}
      </ul>
    </>
  );
};
export default ChannelsSection;