import React from 'react';
import { Modal as ElModal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useApi } from '../../hooks/index.jsx';

const RemoveChannel = ({ handleClose }) => {
  const channelId = useSelector(({ modal }) => modal.id);
  const api = useApi();

  const handleRemove = async () => {
    try {
      await api.removeChannel({ id: channelId });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ElModal.Header closeButton>
        <ElModal.Title>Удалить канал</ElModal.Title>
      </ElModal.Header>
      <ElModal.Body>
        <p className="lead">Удалить?</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
          >
            Отменить
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
          >
            Принять
          </Button>
        </div>
      </ElModal.Body>
    </>
  );
};

export default RemoveChannel;
