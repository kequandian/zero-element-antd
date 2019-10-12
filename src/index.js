import Load from '@/utils/Load';

import { set as APIConfig } from 'zero-element-global/lib/APIConfig';

import { set as LayoutSet } from 'zero-element-global/lib/layout';
import { set as CSet } from 'zero-element-global/lib/container';
import { set as LASet } from 'zero-element-global/lib/listAction';
import { set as FITSet } from 'zero-element-global/lib/formItemType';
import { set as AITSet } from 'zero-element-global/lib/actionItemType';
import { set as VTSet } from 'zero-element-global/lib/valueType';

import onRequest from '@/listAction/onRequest';

APIConfig({
  'DEFAULT_current': 1,
  'DEFAULT_pageSize': 10,

  'REQUEST_FIELD_current': 'pageNumber',
  'REQUEST_FIELD_pageSize': 'pageSize',

  'RESPONSE_FIELD_current': 'current',
  'RESPONSE_FIELD_pageSize': 'size',
  'RESPONSE_FIELD_total': 'total',
  'RESPONSE_FIELD_records': 'records',
  'RESPONSE_FIELD_PID': 'pid',
});

LayoutSet({
  Empty: Load('layout/Empty'),
  Loading: Load('layout/Loading'),
  Alone: Load('layout/Alone'),
  Grid: Load('layout/Grid'),
  Content: Load('layout/Content'),
  Items: Load('layout/Items'),
});

CSet({
  BaseList: Load('container/List/BaseList'),
  ChildrenList: Load('container/List/ChildrenList'),
  TreeList: Load('container/List/TreeList'),
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
  empty: Load('formItemType/Empty'),
  input: Load('formItemType/Input'),
  number: Load('formItemType/Number'),
  radio: Load('formItemType/Radio'),
  select: Load('formItemType/Select'),
  switch: Load('formItemType/Switch'),
  checkbox: Load('formItemType/Checkbox'),
  date: Load('formItemType/Date/date'),
  week: Load('formItemType/Date/week'),
  month: Load('formItemType/Date/month'),
  range: Load('formItemType/Date/range'),
  'upload-image': Load('formItemType/UploadImage'),
  'upload-file': Load('formItemType/UploadFile'),
  'checkbox-fetch': Load('formItemType/CheckboxFetch'),
  'select-fetch': Load('formItemType/SelectFetch'),
  'rich-text': Load('formItemType/RichText'),
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