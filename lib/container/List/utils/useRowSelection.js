"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useRowSelection;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

function useRowSelection(_ref) {
  var onRefresh = _ref.onRefresh;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      selectedRowKeys = _useState2[0],
      setSelectedRowKeys = _useState2[1];

  var options = (0, _react.useRef)({});

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      selections = _useState4[0],
      setSelections = _useState4[1];

  function wrapped(func) {
    return function () {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      func.apply(void 0, [options.current].concat(params));
    };
  }

  function handleSelectChange(selectedRowKeys, selectedRows) {
    options.current = {
      selectedRowKeys: selectedRowKeys,
      selectedRows: selectedRows,
      onRefresh: onRefresh
    };
    setSelectedRowKeys(selectedRowKeys);
  }

  function handleSetSelection(list) {
    if (Array.isArray(list)) {
      setSelections(list.map(function (item, i) {
        var key = item.key,
            title = item.title,
            onClick = item.onClick;
        return {
          key: key || i,
          text: title,
          onSelect: wrapped(onClick)
        };
      }));
    } else {
      console.warn("\u65E0\u6CD5\u8BBE\u7F6E rowSelection, \u4F20\u5165\u4E86\u975E\u9884\u671F\u7684\u6570\u636E\u683C\u5F0F: ".concat(list));
    }
  }

  var rowSelection = {
    selectedRowKeys: selectedRowKeys,
    selections: selections.length > 0 ? selections : false,
    hideDefaultSelections: true,
    onChange: handleSelectChange
  };
  return [rowSelection, handleSetSelection];
}