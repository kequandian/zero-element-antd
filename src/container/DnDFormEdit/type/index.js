import React from 'react';
import Canvas from './Canvas';
import Grid from './Grid';
import LTB from './LTB';

import Plain from './Plain';
import Button from './Button';
import Input from './Input';
import Radio from './Radio';
import Checkbox from './Checkbox';
import Select from './Select';
import Date from './Date';

import OneMany from './OneMany';

const typeMap = {
  Canvas,
  Grid,
  LTB,
  Plain,
  Input,
  Radio,
  Checkbox,
  Select,
  Date,

  OneMany,
  'SelectField': Select,
  'ModalRadio': Button,
};
export default typeMap;