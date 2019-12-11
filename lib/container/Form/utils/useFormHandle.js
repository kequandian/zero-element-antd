"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useFormHandle;

var _react = require("react");

var _Model = require("zero-element/lib/Model");

var _Subscription = _interopRequireDefault(require("./Subscription"));

function useFormHandle(namespace, _ref) {
  var config = _ref.config,
      formProps = _ref.formProps,
      forceInitForm = _ref.forceInitForm;
  var formatValueRef = (0, _react.useRef)({}); // 记录在提交之前需要格式化的字段

  var sub = (0, _react.useRef)(new _Subscription["default"]());
  var model = (0, _Model.getModel)(namespace);
  var firstGetForm = (0, _react.useRef)(true);
  var API = config.API;
  var handle = formProps.handle;
  var onGetOne = handle.onGetOne;
  (0, _react.useEffect)(function (_) {
    if (firstGetForm.current) {
      firstGetForm.current = false;
    } else {
      if (forceInitForm !== undefined && API.getAPI) {
        onGetOne({});
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [forceInitForm]);

  function formatValue(field, toType) {
    // 保存需要 format 的 字段与 format 的方式
    formatValueRef.current[field] = toType;
  }

  function handleGetFormData() {
    return model.getState().formData;
  }

  return [{
    formatValueRef: formatValueRef,
    sub: sub,
    model: model
  }, {
    onFormatValue: formatValue,
    onSaveOtherValue: sub.current.changeValue.bind(sub.current),
    onGetFormData: handleGetFormData,
    bindOnChange: sub.current.recordOnChange.bind(sub.current),
    onSpyChange: sub.current.subscriptionChange.bind(sub.current)
  }];
}