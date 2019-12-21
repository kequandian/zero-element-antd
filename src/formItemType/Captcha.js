import React, { useState, useEffect } from 'react';
import { Icon, Input, Button } from 'antd';
import { LS } from 'zero-element/lib/utils/storage';
import { post } from '@/utils/request';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import useInterval from '@/utils/hooks/useInterval';

const InputGroup = Input.Group;

const typeMap = {
  'email': 'EmailValidate',
  'phone': 'PhoneValidate',
};

export default function Captcha(props) {
  const { options, handle, onChange, formdata, props: propsOtp = {} } = props;
  const {
    API = '/api/pub/validateCodes/send',
    label = '获取', type = 'emali', field,
  } = options;
  const { onGetFormData } = handle;
  const [cd, setCd] = useState(false);
  const [count, setCount] = useState(0);
  const value = formdata[field];

  useDidMount(_ => {
    const time = LS.get('captcha');
    if (time) {
      const endTiem = (Number(time));
      if ((endTiem) > (+new Date())) {
        setCd(true);
        setCount(~~((endTiem - new Date()) / 1000));
        setTimerStart();
      }
    }
  });

  useInterval(() => {
    if (count <= 0) {
      setCd(false);
    } else {
      setCount(count - 1);
    }
  }, cd ? 1000 : null);

  function getCaptcha() {
    LS.set('captcha', +new Date() + 60000);
    setCd(true);
    setCount(60);
    setTimerStart();
    sendCaptcha();
  }

  function setTimerStart() {
    setCd(true);
  }
  function sendCaptcha() {
    if (type && value) {
      post(API, {
        type: typeMap[type],
        receiver: value,
      },
        { message: '验证码已发送' }
      )
    }
  }

  return <InputGroup compact {...propsOtp}>
    <Input
      style={{ width: '70%' }}
      prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
      placeholder="验证码"
      onChange={onChange}
    />
    <Button
      style={{ width: '30%' }}
      disabled={!value || cd}
      onClick={getCaptcha}
    >
      {cd ? count : label}
    </Button>
  </InputGroup>
}