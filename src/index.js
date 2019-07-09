import Load from '@/utils/Load';
import { set as LayoutSet } from 'zero-element-global/lib/layout';
import { set as CSet } from 'zero-element-global/lib/container';
import { set as LASet } from 'zero-element-global/lib/listAction';
import { set as FITSet } from 'zero-element-global/lib/formItemType';
import { set as AITSet } from 'zero-element-global/lib/actionItemType';

import onRequest from '@/listAction/onRequest';

LayoutSet({
  'Empty': ({ children }) => children,
  Grid: Load('layout/Grid'),
  Content: Load('layout/Content'),
});

CSet({
  BaseList: Load('container/List/BaseList'),
  BaseChildren: Load('container/List/BaseChildren'),
  BaseSearch: Load('container/Form/BaseSearch'),
  BaseForm: Load('container/Form/BaseForm'),
  ChildrenForm: Load('container/Form/ChildrenForm'),
  DnDFormEdit: Load('container/DnDFormEdit'),
});

LASet({
  'onRequest': onRequest,
});

FITSet({
  plain: Load('formItemType/Plain'),
  input: Load('formItemType/Input'),
  radio: Load('formItemType/Radio'),
  select: Load('formItemType/Select'),
  checkbox: Load('formItemType/Checkbox'),
  'select-fetch': Load('formItemType/SelectFetch'),
});

AITSet({
  modal: Load('actionItemType/Modal'),
  'children-modal': Load('actionItemType/ChildrenModal'),
});