import Load from "./utils/Load"; // import { set as APIConfig } from 'zero-element/lib/config/APIConfig';

import { set as LayoutSet } from 'zero-element/lib/config/layout';
import { set as CSet } from 'zero-element/lib/config/container';
import { set as LASet } from 'zero-element/lib/config/listAction';
import { set as FITSet } from 'zero-element/lib/config/formItemType';
import { set as AITSet } from 'zero-element/lib/config/actionItemType';
import { set as VTSet } from 'zero-element/lib/config/valueType';
import onRequest from "./listAction/onRequest";
import onTips from "./listAction/onTips"; // APIConfig({

import onPath from "./listAction/onPath"; //   'DEFAULT_current': 1,
//   'DEFAULT_pageSize': 10,
//   'REQUEST_FIELD_current': 'pageNumber',
//   'REQUEST_FIELD_pageSize': 'pageSize',
//   'REQUEST_FIELD_field': 'field',
//   'REQUEST_FIELD_order': 'order',
//   'RESPONSE_FIELD_current': 'current',
//   'RESPONSE_FIELD_pageSize': 'size',
//   'RESPONSE_FIELD_total': 'total',
//   'RESPONSE_FIELD_records': 'records',
//   'RESPONSE_FIELD_PID': 'pid',
// });

LayoutSet({
  Empty: Load('layout/Empty'),
  Title: Load('layout/Title'),
  BaseTitle: Load('layout/BaseTitle'),
  NotTitleContent: Load('layout/NotTitleContent'),
  TitleContent: Load('layout/TitleContent'),
  Loading: Load('layout/Loading'),
  Alone: Load('layout/Alone'),
  Row: Load('layout/Row'),
  SearchLayout: Load('layout/SearchLayout'),
  Grid: Load('layout/Grid'),
  Content: Load('layout/Content'),
  Items: Load('layout/Items')
});
CSet({
  Empty: Load('container/Empty'),
  Table: Load('container/List/Table'),
  ReportTable: Load('container/List/ReportTable'),
  TreeTable: Load('container/List/TreeTable'),
  ChildrenTable: Load('container/List/ChildrenTable'),
  TreeList: Load('container/List/TreeList'),
  AutoReport: Load('container/List/AutoReport'),
  TableSelect: Load('container/List/TableSelect'),
  ItemList: Load('container/List/ItemList'),
  Search: Load('container/Form/Search'),
  AutoReportSearch: Load('container/Form/AutoReportSearch'),
  Form: Load('container/Form/Form'),
  ChildrenForm: Load('container/Form/ChildrenForm')
});
LASet({
  'onRequest': onRequest,
  'onTips': onTips,
  "onPath": onPath
});
FITSet({
  avatars:Load("formItemType/Avatars/Avatars"),
  videoview: Load("formItemType/VideoView/VideoView"),
  plain: Load('formItemType/Plain'),
  image: Load('formItemType/Image'),
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
  tags: Load('formItemType/Tags'),
  download: Load('formItemType/Download'),
  json: Load('formItemType/JSON'),
  date: Load('formItemType/Date/date'),
  week: Load('formItemType/Date/week'),
  month: Load('formItemType/Date/month'),
  range: Load('formItemType/Date/range'),
  "inputType": Load('formItemType/InputType'),
  "TopTips": Load("formItemType/Toptips"),
  'Space': Load("formItemType/Space"),
  'direct-upload': Load('formItemType/DirectUpload'),
  'time-range': Load('formItemType/Time/TimeRange'),
  'table-select': Load('formItemType/TableSelect'),
  'modal-radio': Load('formItemType/ModalRadio'),
  'modal-checkbox': Load('formItemType/ModalCheckbox'),
  'upload-image': Load('formItemType/UploadImage'),
  'upload-file': Load('formItemType/UploadFile'),
  'checkbox-fetch': Load('formItemType/CheckboxFetch'),
  'select-fetch': Load('formItemType/SelectFetch'),
  'select-fetch-val': Load('formItemType/SelectFetchVal'),
  'select-field': Load('formItemType/SelectField'),
  'text-area': Load('formItemType/TextArea'),
  'rich-text': Load('formItemType/RichText'),
  'one-mary': Load('formItemType/OneMary'),
  'number-range': Load('formItemType/NumberRange'),
  'pcdm': Load('formItemType/PCDM'),
  pcdForSearch: Load('formItemType/PCDForSearch')
});
AITSet({
  modal: Load('actionItemType/Modal'),
  request: Load('actionItemType/Request'),
  'children-modal-add': Load('actionItemType/ChildrenModalAdd'),
  'import': Load('actionItemType/Import'),
  'import-modal': Load('actionItemType/ImportModal'),
  'export': Load('actionItemType/Export'),
  'table-checkbox': Load('actionItemType/TableCheckbox')
});
VTSet({
  'index': Load('valueType/index'),
  'plain': Load('valueType/plain'),
  'join': Load('valueType/join'),
  'map': Load('valueType/map'),
  'image': Load('valueType/image'),
  'thumb': Load("valueType/thumb"),
  'tag': Load('valueType/tag'),
  'dot': Load('valueType/dot'),
  'currency': Load('valueType/currency'),
  'percentage': Load('valueType/percentage'),
  'ellipsis': Load('valueType/ellipsis'),
  'complex': Load('valueType/complex'),
  'url': Load('valueType/url'),
  'download': Load('valueType/download'),
  'count-down': Load('valueType/countDown'),
  'input-number': Load('valueType/inputNumber'),
  'input-text': Load('valueType/inputText'),
  'input-select': Load('valueType/inputSelect'),
  'input-select-fetch': Load('valueType/inputSelectFetch')
});