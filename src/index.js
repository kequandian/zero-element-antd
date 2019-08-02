import Load from '@/utils/Load';
import { set as LayoutSet } from 'zero-element-global/lib/layout';
import { set as CSet } from 'zero-element-global/lib/container';
import { set as LASet } from 'zero-element-global/lib/listAction';
import { set as FITSet } from 'zero-element-global/lib/formItemType';
import { set as AITSet } from 'zero-element-global/lib/actionItemType';
import { set as VTSet } from 'zero-element-global/lib/valueType';

import onRequest from '@/listAction/onRequest';

LayoutSet({
  Empty: Load('layout/Empty'),
  Alone: Load('layout/Alone'),
  Grid: Load('layout/Grid'),
  Content: Load('layout/Content'),
});

CSet({
  BaseList: Load('container/List/BaseList'),
  ChildrenList: Load('container/List/ChildrenList'),
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
  date: Load('formItemType/Date/date'),
  week: Load('formItemType/Date/week'),
  month: Load('formItemType/Date/month'),
  range: Load('formItemType/Date/range'),
  'upload-image': Load('formItemType/UploadImage'),
  'select-fetch': Load('formItemType/SelectFetch'),
});

AITSet({
  modal: Load('actionItemType/Modal'),
  'children-modal-add': Load('actionItemType/ChildrenModalAdd'),
});

VTSet({
  'status': Load('valueType/status'),
  'image': Load('valueType/image'),
  'tag': Load('valueType/tag'),
});