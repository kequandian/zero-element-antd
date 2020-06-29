"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ModalCheckbox;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("antd/lib/modal/style/css");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _TableCheckbox = _interopRequireDefault(require("./TableCheckbox"));

function ModalCheckbox(props) {
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
      _options$field = options.field,
      field = _options$field === void 0 ? name : _options$field,
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

  function handleChange(value) {
    selectedData.current = {
      value: value,
      _toValue: value.map(function (item) {
        return item[optValue];
      })
    };
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

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_button["default"], {
    onClick: switchVisible
  }, echoName(value, onGetFormData, {
    field: field,
    label: label,
    editLabel: editLabel
  }) || title), /*#__PURE__*/_react["default"].createElement(_modal["default"], {
    destroyOnClose: true,
    visible: visible,
    title: title,
    onCancel: switchVisible,
    onOk: handleSave
  }, /*#__PURE__*/_react["default"].createElement(_TableCheckbox["default"], {
    namespace: "".concat(namespace, "_").concat(name, "_ModalCheckbox"),
    value: value,
    field: field,
    optValue: optValue,
    onChange: handleChange,
    onGetFormData: onGetFormData,
    API: API,
    fields: fields,
    pagination: pagination,
    requireValid: requireValid
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


function echoName(value, getFormData, _ref) {
  var field = _ref.field,
      label = _ref.label,
      editLabel = _ref.editLabel;

  if (value) {
    if (Array.isArray(value.value)) {
      return value.value.map(function (value) {
        return value[label];
      }).join(', ');
    }
  }

  var formData = getFormData();

  if (formData) {
    if ((0, _typeof2["default"])(formData) === 'object') {
      if (Array.isArray(formData[field])) {
        return formData[field].map(function (item) {
          return item[editLabel];
        }).join(', ');
      }
    }
  }

  return undefined;
}