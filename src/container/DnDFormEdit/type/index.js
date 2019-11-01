import React from 'react';
import Canvas from './Canvas';
import Grid from './Grid';
import LTB from './LTB';

import Plain from './Plain';
import Hidden from './Hidden';
import Button from './Button';
import Input from './Input';
import Radio from './Radio';
import Checkbox from './Checkbox';
import Select from './Select';
import Date from './Date';
import TextArea from './TextArea';

import OneMany from './OneMany';

const typeMap = {
  Canvas,
  Grid,
  LTB,
  Plain,
  Hidden,
  Input,
  Radio,
  Checkbox,
  Select,
  Date,
  TextArea,

  OneMany,
  'SelectField': Select,
  'ModalRadio': Button,
};
export default typeMap;