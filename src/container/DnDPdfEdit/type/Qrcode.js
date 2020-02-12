import React from 'react';
import QRCode from 'qrcode.react';

export default (props) => {
  const { config } = props;
  const { options = {} } = config;
  const { value = {} } = options.base || {};

  return <QRCode value={value.value} />
}