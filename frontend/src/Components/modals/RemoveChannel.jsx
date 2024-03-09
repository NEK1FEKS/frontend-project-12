import React from 'react';
import { Modal as ElModal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useApi } from '../../hooks/index.jsx';
import { useTranslation } from 'react-i18next';

const RemoveChannel = ({ handleClose }) => {
  const { t } = useTranslation();
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
        <ElModal.Title>{t('modals.remove')}</ElModal.Title>
      </ElModal.Header>
      <ElModal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
          >
            {t('modals.cancel')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
          >
            {t('modals.confirm')}
          </Button>
        </div>
      </ElModal.Body>
    </>
  );
};

export default RemoveChannel;
