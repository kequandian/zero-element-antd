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

require("antd/lib/message/style/css");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactFinalForm = require("react-final-form");

var _format = require("zero-element/lib/utils/format");

var _useBaseForm = _interopRequireDefault(require("zero-element/lib/helper/form/useBaseForm"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _readConfig = require("../../utils/readConfig");

var _layout = require("zero-element/lib/config/layout");

var _global = _interopRequireDefault(require("zero-element/lib/config/global"));

var _useFormHandle3 = _interopRequireDefault(require("./utils/useFormHandle"));

var _extraFieldType = _interopRequireDefault(require("./utils/extraFieldType"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function BaseForm(props) {
  var formRef = (0, _react.useRef)({});

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
      onSubmit = props.onSubmit,
      onSetExtraElement = props.onSetExtraElement,
      propsLoading = props.loading,
      forceInitForm = props.forceInitForm,
      footer = props.footer,
      onGetFormRef = props.onGetFormRef,
      _props$keepData = props.keepData,
      keepData = _props$keepData === void 0 ? true : _props$keepData,
      hooks = props.hooks;
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
      layoutType = _layoutConfig$layoutT === void 0 ? 'horizontal' : _layoutConfig$layoutT; // vertical horizontal

  var formProps = (0, _useBaseForm["default"])({
    namespace: namespace,
    modelPath: 'formData',
    extraData: extraData
  }, config);
  var router = _global["default"].router,
      goBack = _global["default"].goBack;
  var loading = formProps.loading,
      data = formProps.data,
      model = formProps.model,
      handle = formProps.handle;
  var initData = (0, _react.useRef)(_objectSpread({}, extraData, {}, data));

  var _useFormHandle = (0, _useFormHandle3["default"])(namespace, {
    config: config,
    forceInitForm: forceInitForm,
    keepData: keepData,
    onGetOne: handleGetData,
    formRef: formRef
  }),
      _useFormHandle2 = (0, _slicedToArray2["default"])(_useFormHandle, 2),
      _useFormHandle2$ = _useFormHandle2[1],
      onFormatValue = _useFormHandle2$.onFormatValue,
      handleFormatValue = _useFormHandle2$.handleFormatValue,
      onSaveOtherValue = _useFormHandle2$.onSaveOtherValue,
      onGetFormData = _useFormHandle2$.onGetFormData,
      bindOnChange = _useFormHandle2$.bindOnChange,
      onSpyChange = _useFormHandle2$.onSpyChange;

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

  var init = (0, _react.useRef)(true);
  (0, _react.useMemo)(recordDefaultValue, [fields]);
  (0, _lifeCycle.useDidMount)(function (_) {
    if (API.getAPI) {
      handleGetData();
    }

    if (onSetExtraElement && goBack) {
      onSetExtraElement( /*#__PURE__*/_react["default"].createElement(_button["default"], {
        onClick: goBack
      }, "\u8FD4\u56DE"));
    }

    if (typeof onGetFormRef === 'function') {
      onGetFormRef(formRef);
    }
  });
  (0, _react.useEffect)(function (_) {
    if (!init.current && Object.keys(data).length !== 0) {
      formRef.current.form.reset(data);
    }

    init.current = false;
  }, [data]);
  (0, _lifeCycle.useWillUnmount)(function (_) {
    if (keepData && !MODAL) {// onCanRecyclable();
    } else {
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

  function handleSubmitForm() {
    var extraSubmit = {};
    fields.forEach(function (field) {
      if (field.type === 'hidden') {
        extraSubmit[field.field] = extraData[field.field] || field.value;
      }
    });

    var submitData = _objectSpread({}, extraSubmit, {}, formRef.current.values);

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
    formRef.current.form.reset();
    model.save('formData', initData.current);
  }

  function renderFooter() {
    function onSubmit() {
      formRef.current.onSubmit();
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
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: fields.length ? 'ant-modal-body' : undefined
  }, destroy ? null : /*#__PURE__*/_react["default"].createElement(_reactFinalForm.Form, {
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
      return /*#__PURE__*/_react["default"].createElement("form", {
        className: "ZEleA-Form-".concat(layoutType),
        onSubmit: handleSubmit
      }, /*#__PURE__*/_react["default"].createElement(_layout.Render, (0, _extends2["default"])({
        n: layout
      }, layoutConfig), fields.map(function (field) {
        return (0, _readConfig.getFormItem)(field, model, {
          namespace: namespace,
          values: values,
          handle: {
            onFormatValue: onFormatValue,
            onSaveOtherValue: onSaveOtherValue,
            onGetFormData: onGetFormData
          },
          bindOnChange: bindOnChange,
          hooks: hooks
        });
      })), /*#__PURE__*/_react["default"].createElement(_reactFinalForm.FormSpy, {
        subscription: {
          values: values
        },
        onChange: onSpyChange
      }));
    }
  })), renderFooter());
}