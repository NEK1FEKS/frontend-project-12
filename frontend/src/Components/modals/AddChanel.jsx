import React, { useEffect, useRef } from 'react';
import { Modal as ElModal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { actions } from '../slices/index.js';
import { useApi } from '../hooks/index.jsx';

const getChannelsName = ({ chatChannels: { channels } }) => channels.map(({ name }) => name);

const AddChannel = ({ handleClose }) => {
  const dispath = useDispatch();
  const channels = useSelector(getChannelsName);
  const api = useApi();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, 'modals.min')
      .max(20, 'modals.max')
      .notOneOf(channels, 'modals.uniq')
      .required('modals.required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async ({ name }) => {
      const channel = { name };
      try {
        const data = await api.createChannel(channel);
        dispath(actions.setCurrentChannel({ channelId: data.id }));
        handleClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <ElModal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
            />
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                Отмена
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                Принять
              </Button>
            </div>
          </Form.Group>
        </Form>
      </ElModal.Body>
    </>
  );
};

export default AddChannel;
