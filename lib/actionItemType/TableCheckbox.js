"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/modal/style/css");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _TableCheckbox = _interopRequireDefault(require("../formItemType/ModalCheckbox/TableCheckbox"));

var _default = function _default(props) {
  var value = props.value,
      title = props.title,
      options = props.options,
      namespace = props.namespace,
      onCreateList = props.onCreateList,
      onGetFormData = props.onGetFormData;
  var modalTitle = options.modalTitle,
      modalWidth = options.modalWidth,
      API = options.API,
      fields = options.fields,
      field = options.field,
      _options$value = options.value,
      optValue = _options$value === void 0 ? 'id' : _options$value,
      requireValid = options.requireValid,
      pagination = options.pagination,
      rest = (0, _objectWithoutProperties2["default"])(options, ["modalTitle", "modalWidth", "API", "fields", "field", "value", "requireValid", "pagination"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      visible = _useState2[0],
      setViseble = _useState2[1];

  var selectedData = (0, _react.useRef)([]);

  function handleOpen() {
    setViseble(true);
  }

  function handleClose() {
    setViseble(false);
  }

  function hanldeChange(data) {
    var _selectedData$current;

    (_selectedData$current = selectedData.current).push.apply(_selectedData$current, (0, _toConsumableArray2["default"])(data));
  }

  function handleSave() {
    onCreateList(selectedData.current);
    handleClose();
  } // const value = onGetFormData()[field];
  // console.log(123, value);


  return _react["default"].createElement("div", null, _react["default"].createElement(_button["default"], {
    onClick: handleOpen,
    type: "primary"
  }, title), _react["default"].createElement(_modal["default"], {
    title: modalTitle,
    width: modalWidth,
    visible: visible,
    destroyOnClose: true,
    onCancel: handleClose,
    bodyStyle: {// padding: 0,
    },
    onOk: handleSave
  }, _react["default"].createElement(_TableCheckbox["default"], {
    value: value,
    field: field,
    optValue: optValue,
    onChange: hanldeChange,
    onGetFormData: onGetFormData,
    API: API,
    fields: fields,
    pagination: pagination,
    requireValid: requireValid
  })));
};

exports["default"] = _default;