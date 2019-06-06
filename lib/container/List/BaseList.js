"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseList;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _useBaseList = _interopRequireDefault(require("zero-element/lib/helper/list/useBaseList"));

var _format = require("./utils/format");

var _antd = require("antd");

function BaseList(props) {
  var symbolRef = (0, _react.useRef)(Symbol('BaseList'));
  var namespace = props.namespace,
      config = props.config;
  var fields = config.fields,
      operation = config.operation,
      _config$props = config.props,
      propsCfg = _config$props === void 0 ? {} : _config$props;
  var listProps = (0, _useBaseList["default"])({
    namespace: namespace,
    modelPath: 'listData',
    symbol: symbolRef.current
  }, config);
  var data = listProps.data,
      handle = listProps.handle;
  var onGetList = handle.onGetList;
  var columns = (0, _format.formatTableFields)(fields, operation, handle);
  (0, _react.useEffect)(function (_) {
    onGetList({});
  }, []);
  return _react["default"].createElement(_antd.Table, (0, _extends2["default"])({
    rowKey: "id",
    dataSource: data,
    columns: columns
  }, propsCfg));
}