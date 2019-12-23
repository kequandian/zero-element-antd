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
  EmptyTitle: Load('layout/EmptyTitle'),
  Loading: Load('layout/Loading'),
  Alone: Load('layout/Alone'),
  Row: Load('layout/Row'),
  SearchLayout: Load('layout/SearchLayout'),
  Grid: Load('layout/Grid'),
  Content: Load('layout/Content'),
  Items: Load('layout/Items'),
});

CSet({
  BaseList: Load('container/List/BaseList'),
  ReportList: Load('container/List/ReportList'),
  TreeTable: Load('container/List/TreeTable'),
  ChildrenList: Load('container/List/ChildrenList'),
  TreeList: Load('container/List/TreeList'),
  TableSelect: Load('container/List/TableSelect'),
  ItemList: Load('container/List/ItemList'),
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
  hidden: Load('formItemType/Hidden'),
  group: Load('formItemType/Group'),
  input: Load('formItemType/Input'),
  password: Load('formItemType/Password'),
  number: Load('formItemType/Number'),
  radio: Load('formItemType/Radio'),
  select: Load('formItemType/Select'),
  switch: Load('formItemType/Switch'),
  checkbox: Load('formItemType/Checkbox'),
  map: Load('formItemType/Map'),
  pcd: Load('formItemType/PCD'),
  captcha: Load('formItemType/Captcha'),
  date: Load('formItemType/Date/date'),
  week: Load('formItemType/Date/week'),
  month: Load('formItemType/Date/month'),
  range: Load('formItemType/Date/range'),
  'table-select': Load('formItemType/TableSelect'),
  'modal-radio': Load('formItemType/ModalRadio'),
  'modal-checkbox': Load('formItemType/ModalCheckbox'),
  'upload-image': Load('formItemType/UploadImage'),
  'upload-file': Load('formItemType/UploadFile'),
  'checkbox-fetch': Load('formItemType/CheckboxFetch'),
  'select-fetch': Load('formItemType/SelectFetch'),
  'select-field': Load('formItemType/SelectField'),
  'text-area': Load('formItemType/TextArea'),
  'rich-text': Load('formItemType/RichText'),
  'one-mary': Load('formItemType/OneMary'),
  'number-range': Load('formItemType/NumberRange'),
  'pcdm': Load('formItemType/PCDM'),
});

AITSet({
  modal: Load('actionItemType/Modal'),
  request: Load('actionItemType/Request'),
  'children-modal-add': Load('actionItemType/ChildrenModalAdd'),
  'import-excel': Load('actionItemType/ImportExcel'),
  'export-excel': Load('actionItemType/ExportExcel'),
  'table-checkbox': Load('actionItemType/TableCheckbox'),
});

VTSet({
  'plain': Load('valueType/plain'),
  'status': Load('valueType/status'),
  'image': Load('valueType/image'),
  'tag': Load('valueType/tag'),
  'currency': Load('valueType/currency'),
  'ellipsis': Load('valueType/ellipsis'),
  'input-number': Load('valueType/inputNumber'),
  'input-text': Load('valueType/inputText'),
});