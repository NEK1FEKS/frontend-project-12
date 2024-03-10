import React, { useEffect, useRef } from 'react';
import { Modal as ElModal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { actions } from '../../slices/index.js';
import { useApi } from '../../hooks/index.jsx';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const getChannelsName = ({ chatChannels: { channels } }) => channels.map(({ name }) => name);

const AddChannel = ({ handleClose }) => {
  const { t } = useTranslation();
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
        toast.success(t('channels.created'));
        handleClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <ElModal.Header closeButton>
      <ElModal.Title>{t('modals.add')}</ElModal.Title>
      </ElModal.Header>
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
            <label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</label>
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
                variant="primary"
                type="submit"
              >
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </ElModal.Body>
    </>
  );
};

export default AddChannel;
