import React from 'react';
import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <h1>{t('notFound.message')}</h1>
  );
};

export default Page404;
