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

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

var _react = _interopRequireWildcard(require("react"));

require("../index.css");

var _tool = require("../../utils/tool");

var _layoutFlex = require("layout-flex");

var CheckboxGroup = _checkbox["default"].Group;
var FlexItem = _layoutFlex.Flex.FlexItem;
var Search = _input["default"].Search;

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

  var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      searchStr = _useState4[0],
      setSearchStr = _useState4[1];

  var optionsOrigin = (0, _react.useMemo)(function (_) {
    if (!Array.isArray(listData)) return [];
    return listData.map(function (i) {
      return {
        label: i[optLabel],
        value: i[optValue]
      };
    });
  }, [listData, optLabel, optValue]);
  var options = (0, _react.useMemo)(function (_) {
    if (searchStr === '') {
      return optionsOrigin;
    }

    return optionsOrigin.filter(function (item) {
      return item.label.indexOf(searchStr) > -1;
    });
  }, [searchStr, optionsOrigin]);
  (0, _react.useEffect)(function (_) {
    if (!keepSelected) {
      setSelectedList([]);
    }
  }, [keepSelected, listData]);

  function handleChange(data) {
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

  function handleAllSelected(e) {
    var checked = e.target.checked;

    if (checked) {
      setSelectedList(optionsOrigin.map(function (i) {
        return i.value;
      }));
    } else {
      setSelectedList([]);
    }
  }

  function handleClick(e) {
    var id = e.target.value;

    if (id) {
      var nId = (0, _tool.toNumber)(id);
      var data = listData.find(function (i) {
        return i.id === nId;
      });
      onClick && onClick(data.id);
    }
  }

  function handleLocalSearch(value) {
    setSearchStr(value);
  }

  var selectedCount = selectedList.length;
  var listCount = listData && listData.length || 0;
  return _react["default"].createElement("div", {
    className: "ZEleA-PCDM-container"
  }, _react["default"].createElement("div", {
    className: "ZEleA-PCDM-title"
  }, _react["default"].createElement(_checkbox["default"], {
    indeterminate: 0 < selectedCount && selectedCount < listCount,
    checked: selectedCount && selectedCount === listCount,
    onChange: handleAllSelected
  }), _react["default"].createElement("div", {
    className: "title"
  }, _react["default"].createElement(_layoutFlex.Flex, null, _react["default"].createElement(FlexItem, {
    flex: 1
  }, title), _react["default"].createElement(FlexItem, {
    className: "search"
  }, _react["default"].createElement(Search, {
    allowClear: true,
    placeholder: "\u641C\u7D22...",
    onSearch: handleLocalSearch
  })))), _react["default"].createElement("span", null, selectedCount, "/", listCount)), _react["default"].createElement("div", {
    className: "ZEleA-PCDM-body"
  }, _react["default"].createElement(CheckboxGroup, {
    onClick: handleClick,
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