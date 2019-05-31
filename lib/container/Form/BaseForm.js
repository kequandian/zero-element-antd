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

require("./index.css");

function BaseForm(props) {
  var namespace = props.namespace,
      config = props.config;
  var layout = config.layout,
      fields = config.fields;
  var formProps = (0, _useBaseForm["default"])({
    namespace: namespace,
    modelPath: 'formData'
  }, config);
  var data = formProps.data,
      modelStatus = formProps.modelStatus,
      handle = formProps.handle;
  var onGetOne = handle.onGetOne,
      onCreateForm = handle.onCreateForm,
      onUpdateForm = handle.onUpdateForm;
  var layoutConfig = {}; // useEffect(_ => {
  //   onGetOne({});
  // }, []);

  function handleSubmit(data) {
    console.log(88888, data);
  }

  return _react["default"].createElement(_antd.Spin, {
    spinning: false
  }, _react["default"].createElement(_reactFinalForm.Form, {
    onSubmit: handleSubmit,
    render: function render(_ref) {
      var handleSubmit = _ref.handleSubmit,
          form = _ref.form,
          submitting = _ref.submitting,
          pristine = _ref.pristine,
          values = _ref.values;
      return _react["default"].createElement("form", {
        onSubmit: handleSubmit
      }, _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
        n: layout
      }, layoutConfig), fields.map(function (field) {
        return (0, _readConfig.getFormItem)(field, modelStatus);
      })));
    }
  }));
}