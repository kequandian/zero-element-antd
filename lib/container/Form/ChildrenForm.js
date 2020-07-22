"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ChildrenForm;

require("antd/lib/spin/style/css");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _useBaseForm = _interopRequireDefault(require("zero-element/lib/helper/form/useBaseForm"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _readConfig = require("../../utils/readConfig");

var _layout = require("zero-element/lib/config/layout");

var _useFormHandle2 = _interopRequireDefault(require("./utils/useFormHandle"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ChildrenForm(props) {
  var _Form$useForm = _form["default"].useForm(),
      _Form$useForm2 = (0, _slicedToArray2["default"])(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var forceUpdate = (0, _lifeCycle.useForceUpdate)();
  var namespace = props.namespace,
      config = props.config,
      index = props.index,
      onClose = props.onClose,
      onSubmit = props.onSubmit;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API,
      _config$layout = config.layout,
      layout = _config$layout === void 0 ? 'Empty' : _config$layout,
      _config$layoutConfig = config.layoutConfig,
      layoutConfig = _config$layoutConfig === void 0 ? {} : _config$layoutConfig,
      fields = config.fields;
  var _layoutConfig$layoutT = layoutConfig.layoutType,
      layoutType = _layoutConfig$layoutT === void 0 ? 'inline' : _layoutConfig$layoutT;
  var formProps = (0, _useBaseForm["default"])({
    namespace: namespace,
    modelPath: 'formData'
  }, config);

  var _useFormHandle = (0, _useFormHandle2["default"])(form, {
    namespace: namespace,
    config: config
  }),
      onFormatValue = _useFormHandle.onFormatValue,
      handleFormatValue = _useFormHandle.handleFormatValue,
      onSaveOtherValue = _useFormHandle.onSaveOtherValue,
      onGetFormData = _useFormHandle.onGetFormData,
      onValuesChange = _useFormHandle.onValuesChange,
      onExpect = _useFormHandle.onExpect;

  var loading = formProps.loading,
      data = formProps.data,
      model = formProps.model,
      handle = formProps.handle;
  var initData = (0, _react.useRef)(props.data || {});
  var onGetOne = handle.onGetOne;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      destroy = _useState2[0],
      setDestroy = _useState2[1]; // useMemo(recordDefaultValue, [fields]);


  (0, _lifeCycle.useDidMount)(function (_) {
    if (API.getAPI) {
      setDestroy(true);
      onGetOne({}).then(function (_ref) {
        var code = _ref.code,
            data = _ref.data;

        if (code === 200) {
          initData.current = data;
          forceUpdate();
        }
      })["finally"](function (_) {
        return setDestroy(false);
      });
    }

    recordDefaultValue();
  });

  function recordDefaultValue() {
    fields.forEach(function (item) {
      var field = item.field,
          value = item.value;

      if (value !== undefined && initData.current[field] === undefined) {
        initData.current[field] = value;
      }
    });
    form.setFieldsValue(_objectSpread({}, initData.current));
    forceUpdate();
  }

  function handleSubmitForm(values) {
    var submitData = _objectSpread({}, values);

    handleFormatValue(submitData);

    if (onSubmit) {
      if (index !== undefined) {
        // 一对多的编辑
        onSubmit(index, submitData);
      } else {
        // 一对多的新增
        onSubmit(submitData);
      }

      if (onClose) {
        onClose();
      }

      return false;
    }
  }

  function handleReset() {
    form.resetFields();
  }

  function renderFooter() {
    function onSubmit() {
      form.submit();
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "ant-modal-footer"
    }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
      onClick: handleReset
    }, "\u91CD\u7F6E"), /*#__PURE__*/_react["default"].createElement(_button["default"], {
      type: "primary",
      htmlType: "submit",
      onClick: onSubmit
    }, "\u4FDD\u5B58"));
  }

  return /*#__PURE__*/_react["default"].createElement(_spin["default"], {
    spinning: loading
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: fields.length ? 'ant-modal-body' : undefined
  }, destroy ? null : /*#__PURE__*/_react["default"].createElement(_form["default"], {
    form: form,
    layout: layoutType,
    initialValues: initData.current,
    onValuesChange: onValuesChange,
    onFinish: handleSubmitForm
  }, /*#__PURE__*/_react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: layout
  }, layoutConfig), fields.map(function (field) {
    return (0, _readConfig.getFormItem)(field, model, {
      namespace: namespace,
      form: form,
      handle: {
        onFormatValue: onFormatValue,
        onSaveOtherValue: onSaveOtherValue,
        onGetFormData: onGetFormData,
        onExpect: onExpect
      }
    });
  })))), renderFooter());
}