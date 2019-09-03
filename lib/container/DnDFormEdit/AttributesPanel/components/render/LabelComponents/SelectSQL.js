"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SelectSQL;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireWildcard(require("react"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _format = require("zero-element/lib/utils/format");

var _request = require("zero-element/lib/utils/request");

var _qs = _interopRequireDefault(require("qs"));

var Option = _select["default"].Option;

function getSearch(location) {
  if (location.search) {
    return location.search.replace('?', '');
  } else {
    return location.hash.split('?')[1] || '';
  }
}

function SelectSQL(props) {
  var field = props.field,
      label = props.label,
      value = props.value,
      handle = props.handle;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      data = _useState4[0],
      setData = _useState4[1];

  (0, _lifeCycle.useDidMount)(queryData);

  function queryData() {
    setLoading(true);
    var _window = window,
        _window$location = _window.location,
        location = _window$location === void 0 ? {} : _window$location;

    var qsObj = _qs["default"].parse(getSearch(location));

    var fAPI = "/api/generate/sql/".concat(qsObj.uuid);
    (0, _request.query)(fAPI).then(function (response) {
      var status = response.status,
          data = response.data;

      if (status === 200 && data.code === 200) {
        setData(data.data);
      }
    })["finally"](function (_) {
      setLoading(false);
    });
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", null, label), _react["default"].createElement(_select["default"], {
    style: {
      minWidth: 120
    },
    value: value,
    onChange: handle.bind(null, field),
    loading: loading
  }, data.map(function (item) {
    return _react["default"].createElement(Option, {
      key: item.id,
      value: item.value
    }, item.title);
  })));
}