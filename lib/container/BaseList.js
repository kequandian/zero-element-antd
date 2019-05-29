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

var _antd = require("antd");

function BaseList(props) {
  var namespace = props.namespace,
      config = props.config;
  var fields = config.fields,
      _config$props = config.props,
      propsCfg = _config$props === void 0 ? {} : _config$props;
  var listProps = (0, _useBaseList["default"])({
    namespace: namespace,
    modelPath: 'listData'
  }, config);
  var data = listProps.data,
      onGetList = listProps.onGetList,
      onDelete = listProps.onDelete;
  (0, _react.useEffect)(function (_) {
    onGetList({});
  }, []);
  return _react["default"].createElement(_antd.Table, (0, _extends2["default"])({
    dataSource: data
  }, propsCfg));
}