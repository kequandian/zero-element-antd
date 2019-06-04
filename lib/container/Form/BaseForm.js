"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseForm;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _reactFinalForm = require("react-final-form");

var _useBaseForm = _interopRequireDefault(require("zero-element/lib/helper/form/useBaseForm"));

var _antd = require("antd");

var _readConfig = require("../../utils/readConfig");

var _layout = require("zero-element-global/lib/layout");

function BaseForm(props) {
  var formRef = (0, _react.useRef)({});
  var symbolRef = (0, _react.useRef)(Symbol());
  var namespace = props.namespace,
      config = props.config,
      onClose = props.onClose;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API,
      _config$layout = config.layout,
      layout = _config$layout === void 0 ? 'Empty' : _config$layout,
      fields = config.fields;
  var formProps = (0, _useBaseForm["default"])({
    namespace: namespace,
    modelPath: 'formData',
    symbol: symbolRef.current
  }, config);
  var data = formProps.data,
      modelStatus = formProps.modelStatus,
      handle = formProps.handle;
  var onGetOne = handle.onGetOne,
      onCreateForm = handle.onCreateForm,
      onUpdateForm = handle.onUpdateForm;
  var layoutConfig = {};
  (0, _react.useEffect)(function (_) {
    if (API.getAPI) {
      onGetOne({});
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (meta.error) {
      ;
    }

    if (API.updateAPI) {
      onUpdateForm({
        fields: formRef.current.values
      }).then(handleResponse);
    } else {
      onCreateForm({
        fields: formRef.current.values
      }).then(handleResponse);
    }
  }

  function handleResponse() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (data.code === 200) {
      _antd.message.success('操作成功');

      if (onClose) {
        onClose();
      }
    } else {
      _antd.message.error("\u64CD\u4F5C\u5931\u8D25: ".concat(data.message));
    }
  }

  function handleReset() {
    formRef.current.form.reset();
  }

  function renderFooter() {
    var onSubmit = formRef.current.onSubmit;
    return _react["default"].createElement("div", {
      className: "ant-modal-footer"
    }, _react["default"].createElement(_antd.Button, {
      onClick: handleReset
    }, "\u91CD\u7F6E"), _react["default"].createElement(_antd.Button, {
      type: "primary",
      htmlType: "submit",
      onClick: onSubmit
    }, "\u4FDD\u5B58"));
  }

  return _react["default"].createElement(_antd.Spin, {
    spinning: false
  }, _react["default"].createElement("div", {
    className: "ant-modal-body"
  }, _react["default"].createElement(_reactFinalForm.Form, {
    initialValues: data,
    onSubmit: handleSubmit,
    render: function render(_ref) {
      var handleSubmit = _ref.handleSubmit,
          form = _ref.form,
          submitting = _ref.submitting,
          pristine = _ref.pristine,
          values = _ref.values;
      formRef.current = {
        form: form,
        values: values,
        onSubmit: handleSubmit
      };
      return _react["default"].createElement("form", {
        onSubmit: handleSubmit
      }, _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
        n: layout
      }, layoutConfig), fields.map(function (field) {
        return (0, _readConfig.getFormItem)(field, modelStatus);
      })));
    }
  })), renderFooter());
}