import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as ElModal } from 'react-bootstrap';
import { actions } from '../../slices/index.js';
import AddChannel from './AddChanel.jsx';
import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const mapping = {
  addChannel: AddChannel,
  renameChannel: RenameChannel,
  removeChannel: RemoveChannel,
};

const Modal = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(actions.closeModal());
  const { isOpened, modalType } = useSelector((state) => state.modal);
  const ModalComponent = mapping[modalType];

  return (
    <ElModal show={isOpened} onHide={handleClose} centered>
      {ModalComponent && <ModalComponent handleClose={handleClose} />}
    </ElModal>
  );
};

export default Modal;
