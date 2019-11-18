"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SaveData;

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _ItemEdit = _interopRequireDefault(require("../../ItemEdit"));

function SaveData(props) {
  var field = props.field,
      label = props.label,
      value = props.value,
      _props$tLabel = props.tLabel,
      tLabel = _props$tLabel === void 0 ? '把这个字段的数据' : _props$tLabel,
      _props$tValue = props.tValue,
      tValue = _props$tValue === void 0 ? '保存为另一个字段' : _props$tValue,
      handle = props.handle;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      listData = _useState2[0],
      setListData = _useState2[1];

  var countId = (0, _react.useRef)(0);
  (0, _react.useEffect)(function (_) {
    if (value) {
      setListData(Object.keys(value).map(function (key) {
        return {
          label: value[key],
          field: key
        };
      }));
    }
  }, [value]);

  function handleAppend() {
    countId.current = countId.current + 1;
    listData.push({
      label: "name_".concat(countId.current),
      field: "name_".concat(countId.current)
    });
    saveData();
  }

  function onChange(index, type, e) {
    var v = e.target.value;
    listData[index][type] = v;
    saveData();
  }

  function onRemove(index) {
    listData.splice(index, 1);
    saveData();
  }

  function saveData() {
    var data = {};
    listData.forEach(function (item) {
      data[item.field] = item.label;
    });
    handle(field, {
      target: {
        value: data
      }
    });
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", null, label), _react["default"].createElement(_button["default"], {
    icon: "plus",
    onClick: handleAppend
  }, "\u6DFB\u52A0\u989D\u5916\u4FDD\u5B58\u6570\u636E"), _react["default"].createElement("br", null), _react["default"].createElement("br", null), _react["default"].createElement(_ItemEdit["default"], {
    text: {
      label: tLabel,
      value: tValue
    },
    valueField: "field",
    items: listData,
    onChange: onChange,
    onRemove: onRemove
  }));
}