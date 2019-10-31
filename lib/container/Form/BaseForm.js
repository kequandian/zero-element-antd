"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseForm;

require("antd/lib/spin/style/css");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/message/style/css");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireWildcard(require("react"));

var _reactFinalForm = require("react-final-form");

var _format = require("zero-element/lib/utils/format");

var _useBaseForm = _interopRequireDefault(require("zero-element/lib/helper/form/useBaseForm"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _readConfig = require("../../utils/readConfig");

var _layout = require("zero-element-global/lib/layout");

var _global = _interopRequireDefault(require("zero-element-global/lib/global"));

var _Model = require("zero-element/lib/Model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var toTypeMap = {
  'html': function html(value) {
    if (value && typeof value.toHTML === 'function') {
      return value.toHTML();
    }

    return value;
  },
  'raw': function raw(value) {
    if (value && typeof value.toHTML === 'function') {
      return value.toRAW();
    }

    return value;
  },
  'toValue': function toValue(value) {
    if ((0, _typeof2["default"])(value) === 'object' && value.hasOwnProperty('_toValue')) {
      return value._toValue;
    }

    return value;
  }
};

function BaseForm(props) {
  var formRef = (0, _react.useRef)({});
  var formatValueRef = (0, _react.useRef)({}); // 记录在提交之前需要格式化的字段

  var _useReducer = (0, _react.useReducer)(function (x) {
    return x + 1;
  }, 0),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      forceUpdate = _useReducer2[1];

  var MODAL = props.MODAL,
      namespace = props.namespace,
      config = props.config,
      _props$extraData = props.extraData,
      extraData = _props$extraData === void 0 ? {} : _props$extraData,
      onClose = props.onClose,
      onSubmit = props.onSubmit;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API,
      _config$layout = config.layout,
      layout = _config$layout === void 0 ? 'Empty' : _config$layout,
      fields = config.fields,
      path = config.path,
      _config$layoutConfig = config.layoutConfig,
      layoutConfig = _config$layoutConfig === void 0 ? {} : _config$layoutConfig;
  var _layoutConfig$layoutT = layoutConfig.layoutType,
      layoutType = _layoutConfig$layoutT === void 0 ? 'horizontal' : _layoutConfig$layoutT; // vertical horizontal

  var formProps = (0, _useBaseForm["default"])({
    namespace: namespace,
    modelPath: 'formData',
    extraData: extraData
  }, config);
  var router = _global["default"].router,
      goBack = _global["default"].goBack;
  var model = (0, _Model.getModel)(namespace);
  var loading = formProps.loading,
      data = formProps.data,
      modelStatus = formProps.modelStatus,
      handle = formProps.handle;
  var initData = (0, _react.useRef)(data);
  var onGetOne = handle.onGetOne,
      onCreateForm = handle.onCreateForm,
      onUpdateForm = handle.onUpdateForm,
      onClearForm = handle.onClearForm;
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
  (0, _lifeCycle.useWillUnmount)(onClearForm);

  function handleSaveOtherValue(field, value) {
    var values = formRef.current.values;
    values[field] = value;
    formRef.current.values = values;
    model.dispatch({
      type: 'save',
      payload: {
        formData: values
      }
    });
  }

  function formatValue(field, toType) {
    // 保存需要 format 的 字段与 format 的方式
    formatValueRef.current[field] = toType;
  }

  function handleGetFormData() {
    return model.getState().formData;
  }

  function handleSubmitForm() {
    var extraSubmit = {};
    fields.forEach(function (field) {
      if (field.type === 'hidden') {
        extraSubmit[field.field] = extraData[field.field] || field.value;
      }
    });

    var submitData = _objectSpread({}, extraSubmit, {}, formRef.current.values); // 提交数据之前，格式化 value


    Object.keys(formatValueRef.current).forEach(function (field) {
      var type = formatValueRef.current[field];
      var value = submitData[field];
      submitData[field] = toTypeMap[type](value);
    });

    if (onSubmit) {
      onSubmit(submitData);
      return false;
    }

    if (API.updateAPI) {
      onUpdateForm({
        fields: submitData
      }).then(handleResponse);
    } else {
      onCreateForm({
        fields: submitData
      }).then(handleResponse);
    }
  }

  function handleResponse() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (data.code === 200) {
      _message2["default"].success('操作成功');

      if (onClose) {
        onClose();
      }

      if (router) {
        if (path) {
          var fPath = (0, _format.formatAPI)(path, {
            namespace: namespace
          });
          router(fPath);
        }
      }

      if (!MODAL && goBack) {
        goBack();
      }
    } else {
      _message2["default"].error("\u64CD\u4F5C\u5931\u8D25: ".concat(data.message));
    }
  }

  function handleReset() {
    formRef.current.form.reset();
    model.dispatch({
      type: 'save',
      payload: {
        formData: initData.current
      }
    });
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
      }; // 用于配合 checkExpected 功能的
      // model.setState('formData', values);

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
            onFormatValue: formatValue,
            onSaveOtherValue: handleSaveOtherValue,
            onGetFormData: handleGetFormData
          }
        });
      })));
    }
  })), renderFooter());
}