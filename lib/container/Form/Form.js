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

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _format = require("zero-element/lib/utils/format");

var _useBaseForm = _interopRequireDefault(require("zero-element/lib/helper/form/useBaseForm"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _readConfig = require("../../utils/readConfig");

var _layout = require("zero-element/lib/config/layout");

var _global = _interopRequireDefault(require("zero-element/lib/config/global"));

var _useFormHandle2 = _interopRequireDefault(require("./utils/useFormHandle"));

var _extraFieldType = _interopRequireDefault(require("./utils/extraFieldType"));

var _canPortal = _interopRequireDefault(require("../../utils/canPortal"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultLabelCol = {
  xs: {
    span: 8
  }
};
var defaultWrapperCol = {// xs: { span: 16, },
};

function BaseForm(props) {
  var _Form$useForm = _form["default"].useForm(),
      _Form$useForm2 = (0, _slicedToArray2["default"])(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var forceUpdate = (0, _lifeCycle.useForceUpdate)();
  var MODAL = props.MODAL,
      namespace = props.namespace,
      config = props.config,
      _props$extraData = props.extraData,
      extraData = _props$extraData === void 0 ? {} : _props$extraData,
      onClose = props.onClose,
      onSubmit = props.onSubmit,
      extraEl = props.extraEl,
      propsLoading = props.loading,
      forceInitForm = props.forceInitForm,
      footer = props.footer,
      hooks = props.hooks,
      formRef = props.formRef,
      _props$keepData = props.keepData,
      keepData = _props$keepData === void 0 ? false : _props$keepData;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API,
      _config$layout = config.layout,
      layout = _config$layout === void 0 ? 'Empty' : _config$layout,
      _config$layoutConfig = config.layoutConfig,
      layoutConfig = _config$layoutConfig === void 0 ? {} : _config$layoutConfig,
      fieldsCfg = config.fields,
      path = config.path,
      _config$goBack = config.goBack,
      gobackOpt = _config$goBack === void 0 ? true : _config$goBack,
      footerOpt = config.footer,
      requestOptions = config.requestOptions;
  var _layoutConfig$layoutT = layoutConfig.layoutType,
      layoutType = _layoutConfig$layoutT === void 0 ? 'inline' : _layoutConfig$layoutT; // inline vertical horizontal

  var formProps = (0, _useBaseForm["default"])({
    namespace: namespace,
    modelPath: 'formData',
    extraData: extraData
  }, config);
  var router = _global["default"].router,
      goBack = _global["default"].goBack;
  var renderGoBack = extraEl && extraEl.current && goBack;
  var loading = formProps.loading,
      data = formProps.data,
      model = formProps.model,
      handle = formProps.handle;
  var initData = (0, _react.useRef)(_objectSpread({}, extraData, {}, data));

  var _useFormHandle = (0, _useFormHandle2["default"])(form, {
    namespace: namespace,
    config: config,
    forceInitForm: forceInitForm,
    onGetOne: handleGetData
  }),
      onFormatValue = _useFormHandle.onFormatValue,
      handleFormatValue = _useFormHandle.handleFormatValue,
      onSaveOtherValue = _useFormHandle.onSaveOtherValue,
      onGetFormData = _useFormHandle.onGetFormData,
      onValuesChange = _useFormHandle.onValuesChange,
      onExpect = _useFormHandle.onExpect;

  var extraFields = (0, _react.useRef)([]);

  var _useState = (0, _react.useState)(fieldsCfg),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      fields = _useState2[0],
      setFields = _useState2[1];

  var onGetOne = handle.onGetOne,
      onCreateForm = handle.onCreateForm,
      onUpdateForm = handle.onUpdateForm,
      onClearForm = handle.onClearForm;

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      destroy = _useState4[0],
      setDestroy = _useState4[1];

  (0, _react.useMemo)(recordDefaultValue, [fields]);
  (0, _lifeCycle.useDidMount)(function (_) {
    if (API.getAPI) {
      handleGetData();
    }

    if ((0, _typeof2["default"])(formRef) === 'object') {
      formRef.current = form;
    }
  });
  (0, _lifeCycle.useWillUnmount)(function (_) {
    if (!keepData) {
      onClearForm();
    }
  });

  function handleGetData() {
    setDestroy(true);
    onGetOne({}).then(function (_ref) {
      var code = _ref.code,
          data = _ref.data;

      if (code === 200) {
        initData.current = data;
        var extra = data.extra;

        if (extra && Array.isArray(extra.items)) {
          setExtraFields(extra.items);
        } else {
          forceUpdate();
        }
      }
    })["finally"](function (_) {
      setDestroy(false);
    });
  }

  function setExtraFields(items) {
    setFields([].concat((0, _toConsumableArray2["default"])(fields), (0, _toConsumableArray2["default"])(items.map(function (item) {
      extraFields.current.push(item.attr);
      return {
        label: item.fieldName,
        field: item.attr,
        type: _extraFieldType["default"][item.fieldType] || 'input',
        value: item.value
      };
    }))));
  }

  function recordDefaultValue() {
    fields.forEach(function (item) {
      var field = item.field,
          value = item.value;

      if (value !== undefined && initData.current[field] === undefined) {
        initData.current[field] = value;
      }
    });
  }

  function handleSubmitForm(values) {
    var extraSubmit = {};
    fields.forEach(function (field) {
      if (field.type === 'hidden') {
        extraSubmit[field.field] = extraData[field.field] || field.value;
      }
    });

    var submitData = _objectSpread({}, extraSubmit, {}, values);

    handleFormatValue(submitData); // 修改并提交 extra 里面的数据

    extraFields.current.forEach(function (field) {
      var find = submitData.extra.items.find(function (item) {
        return item.attr === field;
      });

      if (find) {
        find.value = submitData[field];
        delete submitData[field];
      }
    });

    if (onSubmit) {
      onSubmit(submitData);
      return false;
    }

    if (API.updateAPI) {
      onUpdateForm({
        fields: submitData,
        options: requestOptions
      }).then(handleResponse);
    } else {
      onCreateForm({
        fields: submitData,
        options: requestOptions
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

      if (!MODAL && gobackOpt && goBack) {
        goBack();
      }
    } else {
      _message2["default"].error("\u64CD\u4F5C\u5931\u8D25: ".concat(data.message));
    }
  }

  function handleReset() {
    form.resetFields();
  }

  function renderFooter() {
    function onSubmit() {
      form.submit();
    }

    if (footer !== undefined || footerOpt !== undefined) {
      return footer;
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
    spinning: propsLoading || loading
  }, renderGoBack && (0, _canPortal["default"])(extraEl, /*#__PURE__*/_react["default"].createElement(_button["default"], {
    onClick: goBack
  }, "\u8FD4\u56DE")), /*#__PURE__*/_react["default"].createElement("div", {
    className: fields.length ? 'ant-modal-body' : undefined
  }, destroy ? null : /*#__PURE__*/_react["default"].createElement(_form["default"], {
    form: form,
    layout: layoutType,
    labelCol: defaultLabelCol,
    wrapperCol: defaultWrapperCol,
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
      },
      hooks: hooks,
      extraData: extraData
    });
  })))), renderFooter());
}