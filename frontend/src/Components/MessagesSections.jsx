import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useAuth, useApi } from '../hooks/index.jsx';
import { useTranslation } from 'react-i18next';

const MessageForm = ({ channel }) => {
  const { t } = useTranslation();
  const api = useApi();
  const { user } = useAuth();
  const { username } = user;

  const validateSchema = yup.object().shape({
    body: yup
      .string()
      .trim()
      .required('Required'),
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validateSchema,
    onSubmit: async ({ body }) => {
      const message = {
        body,
        channelId: channel.id,
        username,
      };
      try {
        await api.sendMessage(message);
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
      formik.setSubmitting(false);
      inputRef.current.focus();
    },
  });

  const isInvalid = !formik.dirty || !formik.isValid;

  return (
    <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <InputGroup>
        <Form.Control
          ref={inputRef}
          onChange={formik.handleChange}
          name="body"
          disabled={formik.isSubmitting}
          aria-label={t('chat.newMessage')}
          value={formik.values.body}
          className="border-0 p-0 ps-2"
          placeholder={t('chat.placeholder')}
        />
        <Button type="submit" variant="group-vertical" disabled={isInvalid}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2
              2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0
              0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1
              0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

const MessagesSection = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector((state) => {
    const { chatChannels: { channels, currentChannelId } } = state;
    return channels.find((channel) => channel.id === currentChannelId);
  });

  const channelMessages = useSelector((state) => {
    const { messages } = state.chatMessages;
    const { currentChannelId } = state.chatChannels;
    return messages.filter(({ channelId }) => channelId === currentChannelId);
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
          {`# ${currentChannel?.name ?? t('channels.creatingChannel')}`}
          </b>
        </p>
        <span className="text-muted">
        {`${channelMessages.length} ${t('chat.messageCount', { count: channelMessages.length })}`}
        </span>
      </div>
      <div id="message-box" className="chat-messages overflow-auto px-5 ">
        {channelMessages.map(({ id, username, body }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>
            {': '}
            {body}
          </div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <MessageForm channel={currentChannel} />
      </div>
    </div>
  );
};

export default MessagesSection;