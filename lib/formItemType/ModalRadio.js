"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ModalRadio;

require("antd/lib/modal/style/css");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _TableSelect = _interopRequireDefault(require("./TableSelect"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ModalRadio(props) {
  var name = props.name,
      value = props.value,
      namespace = props.namespace,
      _props$options = props.options,
      options = _props$options === void 0 ? {} : _props$options,
      p = props.props,
      onChange = props.onChange,
      handle = props.handle,
      rest = (0, _objectWithoutProperties2["default"])(props, ["name", "value", "namespace", "options", "props", "onChange", "handle"]);
  var _options$title = options.title,
      title = _options$title === void 0 ? '选择数据' : _options$title,
      _options$label = options.label,
      label = _options$label === void 0 ? 'name' : _options$label,
      _options$editLabel = options.editLabel,
      editLabel = _options$editLabel === void 0 ? label : _options$editLabel,
      _options$value = options.value,
      optValue = _options$value === void 0 ? 'id' : _options$value,
      API = options.API,
      _options$fields = options.fields,
      fields = _options$fields === void 0 ? [] : _options$fields,
      saveData = options.saveData,
      requireValid = options.requireValid,
      pagination = options.pagination;
  var onFormatValue = handle.onFormatValue,
      onGetFormData = handle.onGetFormData,
      onSaveOtherValue = handle.onSaveOtherValue;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var selectedData = (0, _react.useRef)({});
  (0, _lifeCycle.useDidMount)(function (_) {
    onFormatValue(name, 'toValue');
  });

  function hanldeChange(value) {
    selectedData.current = _objectSpread({}, value[0], {
      _toValue: value[0][optValue]
    });
  }

  function switchVisible() {
    setVisible(!visible);
  }

  function handleSave() {
    onChange(selectedData.current);
    setVisible(false);

    if (saveData) {
      Object.keys(saveData).forEach(function (key) {
        onSaveOtherValue(key, selectedData.current[saveData[key]]);
      });
    }
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_button["default"], {
    onClick: switchVisible
  }, echoName(value, onGetFormData, {
    label: label,
    editLabel: editLabel
  }) || title), _react["default"].createElement(_modal["default"], {
    visible: visible,
    title: title,
    onCancel: switchVisible,
    onOk: handleSave
  }, _react["default"].createElement(_TableSelect["default"], {
    value: (0, _typeof2["default"])(value) === 'object' ? [value] : [(0, _defineProperty2["default"])({}, optValue, value)],
    onChange: hanldeChange,
    options: {
      API: API,
      fields: fields,
      type: 'radio',
      value: optValue,
      requireValid: requireValid,
      pagination: pagination
    }
  })));
}
/**
 * 显示的名称
 * 优先显示已选择的数据的名称
 *
 * @param {number | object} value
 * @param {function} getFormData
 * @param {object} {
 *   label,
 *   editLabel,
 * }
 * @returns
 */


function echoName(value, getFormData, _ref2) {
  var label = _ref2.label,
      editLabel = _ref2.editLabel;

  if (value) {
    if ((0, _typeof2["default"])(value) === 'object') {
      return value[label];
    }
  }

  var formData = getFormData();

  if (formData) {
    if ((0, _typeof2["default"])(formData) === 'object') {
      return formData[editLabel];
    }
  }

  return undefined;
}