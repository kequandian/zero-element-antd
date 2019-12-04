"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PCDMContainer;

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("antd/lib/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

var _react = _interopRequireWildcard(require("react"));

require("../index.css");

var CheckboxGroup = _checkbox["default"].Group;

function PCDMContainer(_ref) {
  var title = _ref.title,
      operationName = _ref.operationName,
      keepSelected = _ref.keepSelected,
      listData = _ref.listData,
      optLabel = _ref.optLabel,
      optValue = _ref.optValue,
      onClick = _ref.onClick,
      onSelect = _ref.onSelect;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      selectedList = _useState2[0],
      setSelectedList = _useState2[1];

  var options = (0, _react.useMemo)(function (_) {
    if (!listData) return [];
    return listData.map(function (i) {
      return {
        label: i[optLabel],
        value: i[optValue]
      };
    });
  }, [listData, optLabel, optValue]);
  (0, _react.useEffect)(function (_) {
    if (!keepSelected) {
      setSelectedList([]);
    }
  }, [keepSelected, listData]);

  function handleChange(data) {
    onClick && onClick(data);
    setSelectedList(data);
  }

  function handleSelected() {
    onSelect(listData.filter(function (item) {
      return selectedList.includes(item.id);
    }));

    if (keepSelected) {
      setSelectedList([]);
    }
  }

  var selectedCount = selectedList.length;
  var listCount = listData && listData.length || 0;
  return _react["default"].createElement("div", {
    className: "ZEleA-PCDM-container"
  }, _react["default"].createElement("div", {
    className: "ZEleA-PCDM-title"
  }, _react["default"].createElement(_checkbox["default"], {
    indeterminate: 0 < selectedCount && selectedCount < listCount,
    checked: selectedCount && selectedCount === listCount
  }), _react["default"].createElement("div", {
    className: "title"
  }, title), _react["default"].createElement("span", null, selectedCount, "/", listCount)), _react["default"].createElement("div", {
    className: "ZEleA-PCDM-body"
  }, _react["default"].createElement(CheckboxGroup, {
    onChange: handleChange,
    options: options,
    value: selectedList
  })), _react["default"].createElement("div", {
    className: "ZEleA-PCDM-footer"
  }, _react["default"].createElement(_button["default"], {
    type: "link",
    disabled: !selectedList.length,
    onClick: handleSelected
  }, operationName)));
}