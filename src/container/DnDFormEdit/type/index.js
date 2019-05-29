import React from 'react';
import Canvas from './Canvas';
import Grid from './Grid';
import LTB from './LTB';

import Plain from './Plain';
import Input from './Input';
import Radio from './Radio';

const typeMap = {
  Canvas: Canvas,
  Grid: Grid,
  LTB: LTB,
  Plain: Plain,
  Input: Input,
  Radio: Radio,
};
export default typeMap;