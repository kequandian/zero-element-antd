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

var _request = require("../../../../../../utils/request");

var _window = _interopRequireDefault(require("zero-element/lib/utils/window"));

var _qs = _interopRequireDefault(require("qs"));

var _format = require("zero-element/lib/utils/format");

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
      handle = props.handle,
      API = props.API;
  var onAdvancedChange = handle.onAdvancedChange;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      data = _useState4[0],
      setData = _useState4[1];

  (0, _lifeCycle.useDidMount)(function (_) {
    if (API.sqlAPI) {
      querySQLData(API.sqlAPI);
    }
  });

  function querySQLData(api) {
    setLoading(true);
    var _window$location = _window["default"].location,
        location = _window$location === void 0 ? {} : _window$location;

    var qsObj = _qs["default"].parse(getSearch(location));

    var fAPI = (0, _format.formatAPI)(api, {
      namespace: '_DndForm',
      data: {
        uuid: qsObj.uuid
      }
    });
    (0, _request.query)(fAPI).then(function (data) {
      setData(data);
    })["finally"](function (_) {
      setLoading(false);
    });
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", null, label), _react["default"].createElement(_select["default"], {
    style: {
      width: 190
    },
    value: value,
    onChange: onAdvancedChange.bind(null, field),
    loading: loading
  }, data.map(function (item) {
    return _react["default"].createElement(Option, {
      key: item.id,
      value: item.value
    }, item.title);
  })));
}