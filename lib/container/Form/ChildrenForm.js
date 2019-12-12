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

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactFinalForm = require("react-final-form");

var _useBaseForm = _interopRequireDefault(require("zero-element/lib/helper/form/useBaseForm"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _readConfig = require("../../utils/readConfig");

var _layout = require("zero-element-global/lib/layout");

var _useFormHandle3 = _interopRequireDefault(require("./utils/useFormHandle"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ChildrenForm(props) {
  var formRef = (0, _react.useRef)({});

  var _useReducer = (0, _react.useReducer)(function (x) {
    return x + 1;
  }, 0),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      forceUpdate = _useReducer2[1];

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
      layoutType = _layoutConfig$layoutT === void 0 ? 'vertical' : _layoutConfig$layoutT;
  var formProps = (0, _useBaseForm["default"])({
    namespace: namespace,
    modelPath: 'formData'
  }, config);

  var _useFormHandle = (0, _useFormHandle3["default"])(namespace, {
    config: config
  }),
      _useFormHandle2 = (0, _slicedToArray2["default"])(_useFormHandle, 2),
      _useFormHandle2$ = _useFormHandle2[1],
      onFormatValue = _useFormHandle2$.onFormatValue,
      handleFormatValue = _useFormHandle2$.handleFormatValue,
      onSaveOtherValue = _useFormHandle2$.onSaveOtherValue,
      onGetFormData = _useFormHandle2$.onGetFormData,
      bindOnChange = _useFormHandle2$.bindOnChange,
      onSpyChange = _useFormHandle2$.onSpyChange;

  var loading = formProps.loading,
      data = formProps.data,
      modelStatus = formProps.modelStatus,
      handle = formProps.handle;
  var initData = (0, _react.useRef)(props.data || {});
  var onGetOne = handle.onGetOne;
  (0, _react.useMemo)(recordDefaultValue, [fields]);
  (0, _lifeCycle.useDidMount)(function (_) {
    if (API.getAPI) {
      onGetOne({}).then(function (_ref) {
        var code = _ref.code,
            data = _ref.data;

        if (code === 200) {
          initData.current = data;
          forceUpdate();
        }
      });
    }
  });

  function recordDefaultValue() {
    fields.forEach(function (item) {
      var field = item.field,
          value = item.value;

      if (value !== undefined && initData.current[field] === undefined) {
        initData.current[field] = value;
      }
    });
  }

  function handleSubmitForm() {
    var submitData = _objectSpread({}, formRef.current.values);

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
        formRef.current.onSubmit();
        onClose();
      }

      return false;
    }
  }

  function handleReset() {
    formRef.current.form.reset();
  }

  function renderFooter() {
    function onSubmit() {
      formRef.current.onSubmit();
    }

    return _react["default"].createElement("div", {
      className: "ant-modal-footer"
    }, _react["default"].createElement(_button["default"], {
      onClick: handleReset
    }, "\u91CD\u7F6E"), _react["default"].createElement(_button["default"], {
      type: "primary",
      htmlType: "submit",
      onClick: onSubmit
    }, "\u4FDD\u5B58"));
  }

  return _react["default"].createElement(_spin["default"], {
    spinning: loading
  }, _react["default"].createElement("div", {
    className: fields.length ? 'ant-modal-body' : undefined
  }, _react["default"].createElement(_reactFinalForm.Form, {
    initialValues: initData.current,
    onSubmit: handleSubmitForm,
    render: function render(_ref2) {
      var handleSubmit = _ref2.handleSubmit,
          form = _ref2.form,
          submitting = _ref2.submitting,
          pristine = _ref2.pristine,
          values = _ref2.values;
      formRef.current = {
        form: form,
        values: values,
        onSubmit: handleSubmit
      };
      return _react["default"].createElement("form", {
        className: "ZEleA-Form-".concat(layoutType),
        onSubmit: handleSubmit
      }, _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
        n: layout
      }, layoutConfig), fields.map(function (field) {
        return (0, _readConfig.getFormItem)(field, modelStatus, {
          namespace: namespace,
          values: values,
          handle: {
            onFormatValue: onFormatValue,
            onSaveOtherValue: onSaveOtherValue,
            onGetFormData: onGetFormData
          },
          bindOnChange: bindOnChange
        });
      })), _react["default"].createElement(_reactFinalForm.FormSpy, {
        subscription: {
          values: values
        },
        onChange: onSpyChange
      }));
    }
  })), renderFooter());
}