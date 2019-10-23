"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _Load = _interopRequireDefault(require("./utils/Load"));

var _APIConfig = require("zero-element-global/lib/APIConfig");

var _layout = require("zero-element-global/lib/layout");

var _container = require("zero-element-global/lib/container");

var _listAction = require("zero-element-global/lib/listAction");

var _formItemType = require("zero-element-global/lib/formItemType");

var _actionItemType = require("zero-element-global/lib/actionItemType");

var _valueType = require("zero-element-global/lib/valueType");

var _onRequest = _interopRequireDefault(require("./listAction/onRequest"));

(0, _APIConfig.set)({
  'DEFAULT_current': 1,
  'DEFAULT_pageSize': 10,
  'REQUEST_FIELD_current': 'pageNumber',
  'REQUEST_FIELD_pageSize': 'pageSize',
  'RESPONSE_FIELD_current': 'current',
  'RESPONSE_FIELD_pageSize': 'size',
  'RESPONSE_FIELD_total': 'total',
  'RESPONSE_FIELD_records': 'records',
  'RESPONSE_FIELD_PID': 'pid'
});
(0, _layout.set)({
  Empty: (0, _Load["default"])('layout/Empty'),
  EmptyTitle: (0, _Load["default"])('layout/EmptyTitle'),
  Loading: (0, _Load["default"])('layout/Loading'),
  Alone: (0, _Load["default"])('layout/Alone'),
  Grid: (0, _Load["default"])('layout/Grid'),
  Content: (0, _Load["default"])('layout/Content'),
  Items: (0, _Load["default"])('layout/Items')
});
(0, _container.set)({
  BaseList: (0, _Load["default"])('container/List/BaseList'),
  ChildrenList: (0, _Load["default"])('container/List/ChildrenList'),
  TreeList: (0, _Load["default"])('container/List/TreeList'),
  BaseSearch: (0, _Load["default"])('container/Form/BaseSearch'),
  BaseForm: (0, _Load["default"])('container/Form/BaseForm'),
  ChildrenForm: (0, _Load["default"])('container/Form/ChildrenForm'),
  DnDFormEdit: (0, _Load["default"])('container/DnDFormEdit')
});
(0, _listAction.set)({
  'onRequest': _onRequest["default"]
});
(0, _formItemType.set)({
  plain: (0, _Load["default"])('formItemType/Plain'),
  empty: (0, _Load["default"])('formItemType/Empty'),
  hidden: (0, _Load["default"])('formItemType/Empty'),
  input: (0, _Load["default"])('formItemType/Input'),
  number: (0, _Load["default"])('formItemType/Number'),
  radio: (0, _Load["default"])('formItemType/Radio'),
  select: (0, _Load["default"])('formItemType/Select'),
  "switch": (0, _Load["default"])('formItemType/Switch'),
  checkbox: (0, _Load["default"])('formItemType/Checkbox'),
  date: (0, _Load["default"])('formItemType/Date/date'),
  week: (0, _Load["default"])('formItemType/Date/week'),
  month: (0, _Load["default"])('formItemType/Date/month'),
  range: (0, _Load["default"])('formItemType/Date/range'),
  'table-select': (0, _Load["default"])('formItemType/TableSelect'),
  'upload-image': (0, _Load["default"])('formItemType/UploadImage'),
  'upload-file': (0, _Load["default"])('formItemType/UploadFile'),
  'checkbox-fetch': (0, _Load["default"])('formItemType/CheckboxFetch'),
  'select-fetch': (0, _Load["default"])('formItemType/SelectFetch'),
  'text-area': (0, _Load["default"])('formItemType/TextArea'),
  'rich-text': (0, _Load["default"])('formItemType/RichText')
});
(0, _actionItemType.set)({
  modal: (0, _Load["default"])('actionItemType/Modal'),
  'children-modal-add': (0, _Load["default"])('actionItemType/ChildrenModalAdd'),
  'import-excel': (0, _Load["default"])('actionItemType/ImportExcel'),
  'export-excel': (0, _Load["default"])('actionItemType/ExportExcel')
});
(0, _valueType.set)({
  'status': (0, _Load["default"])('valueType/status'),
  'image': (0, _Load["default"])('valueType/image'),
  'tag': (0, _Load["default"])('valueType/tag')
});