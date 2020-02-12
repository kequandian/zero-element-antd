import React from 'react';
import Canvas from '../../DnDFormEdit/type/Canvas';
import Grid from './Grid';
import LTB from '../../DnDFormEdit/type/LTB';

import Plain from '../../DnDFormEdit/type/Plain';
import Group from '../../DnDFormEdit/type/Group';
import Checkbox from '../../DnDFormEdit/type/Checkbox';
import InputUnderline from './InputUnderline';
import Image from './Image';

const typeMap = {
  Canvas,
  Grid,
  LTB,
  Plain,
  Group,
  Checkbox,
  InputUnderline,
  Image,
};
export default typeMap;