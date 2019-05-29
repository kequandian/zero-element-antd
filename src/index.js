import { set as LayoutSet } from 'zero-element-global/lib/layout';
import { set as BCSet } from 'zero-element-global/lib/baseComponents';

import BaseList from '@/container/BaseList';
import DnDFormEdit from '@/container/DnDFormEdit';

LayoutSet({
  'Empty': ({ children }) => children,
});

BCSet({
  BaseList,
  DnDFormEdit,
});