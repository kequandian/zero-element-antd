"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormItem = getFormItem;
exports.getActionItem = getActionItem;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _FormItemWrapped = _interopRequireDefault(require("../container/Form/FormItemWrapped"));

var _ActionItemWrapped = _interopRequireDefault(require("../container/List/ActionItemWrapped"));

var _checkExpected = _interopRequireDefault(require("./checkExpected"));

function getFormItem(field, model, _ref) {
  var namespace = _ref.namespace,
      form = _ref.form,
      handle = _ref.handle,
      hooks = _ref.hooks;
  var fieldName = field.field,
      label = field.label,
      value = field.value,
      _field$extra = field.extra,
      extra = _field$extra === void 0 ? '' : _field$extra,
      span = field.span,
      _field$rules = field.rules,
      rules = _field$rules === void 0 ? [] : _field$rules,
      type = field.type,
      _field$options = field.options,
      options = _field$options === void 0 ? {} : _field$options,
      expect = field.expect,
      rest = (0, _objectWithoutProperties2["default"])(field, ["field", "label", "value", "extra", "span", "rules", "type", "options", "expect"]);
  var values = form.getFieldsValue();

  if (type === 'empty') {
    return null;
  }

  if (expect && expect.field) {
    handle.onExpect(expect.field);
  }

  if (!(0, _checkExpected["default"])(values, expect)) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement(_form["default"].Item, (0, _extends2["default"])({
    key: fieldName,
    label: label,
    span: span,
    name: fieldName,
    defaultValue: value,
    rules: (0, _toConsumableArray2["default"])(rules.map(handleRule))
  }, rest), /*#__PURE__*/_react["default"].createElement(_FormItemWrapped["default"], (0, _extends2["default"])({
    name: fieldName,
    type: type,
    options: options,
    namespace: namespace,
    handle: handle,
    formdata: values,
    hooks: hooks
  }, rest)));
}

function getActionItem(action, model, handle, props) {
  var _action$options = action.options,
      options = _action$options === void 0 ? {} : _action$options,
      expect = action.expect;
  var listData = model[options.expectedPath || 'listData'];

  if (!(0, _checkExpected["default"])(listData, expect || options)) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement(_ActionItemWrapped["default"], (0, _extends2["default"])({}, props, action, {
    handle: handle
  }));
}

function handleRule(rule) {
  if (typeof rule === 'string') {
    return ruleWrapped(defaultRule[rule]) || defaultRule['undefined'];
  } else if ((0, _typeof2["default"])(rule) === 'object') {
    var type = rule.type,
        message = rule.message;

    if (type) {
      return ruleWrapped(defaultRule[type], message);
    } else {
      return defaultRule['undefined'];
    }
  }

  return defaultRule['error'];
}

var defaultRule = {
  required: function required() {
    return {
      required: true
    };
  },
  // mail: (msg = '请输入正确的电子邮箱格式', value) => {
  //   if (!value && value !== 0) return undefined;
  //   return /\w+@\w+.\w+/.test(value) ? undefined : msg;
  // },
  // phone: (msg = '请输入正确的手机号码格式', value) => {
  //   if (!value && value !== 0) return undefined;
  //   return /^1[3456789]\d{9}$/.test(value) ? undefined : msg;
  // },
  error: function error(value) {
    return console.warn("\u975E\u6CD5\u7684 rules \u5B50\u9879: ".concat(value)) && undefined;
  },
  undefined: function (_undefined) {
    function undefined(_x) {
      return _undefined.apply(this, arguments);
    }

    undefined.toString = function () {
      return _undefined.toString();
    };

    return undefined;
  }(function (value) {
    return console.warn("\u503C: ".concat(value, " \u4F7F\u7528\u4E86\u672A\u77E5\u7684\u6821\u9A8C\u89C4\u5219")) && undefined;
  })
};

function ruleWrapped(func, msg) {
  return func.bind(null, msg);
}