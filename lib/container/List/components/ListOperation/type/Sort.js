"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _default = function _default(_ref, i, _ref2, onAction) {
  var options = _ref.options;
  var index = _ref2.index,
      record = _ref2.record,
      records = _ref2.records;
  var entity = options.entity;

  function handleDown() {
    var api = "/api/meta/patch/entity/".concat(entity, "/action/movedown/row/").concat(record.id, "/row/").concat(records[index + 1].id);
    handleRequest(api);
  }

  function handleUp() {
    var api = "/api/meta/patch/entity/".concat(entity, "/action/moveup/row/").concat(record.id, "/row/").concat(records[index - 1].id);
    handleRequest(api);
  }

  function handleRequest(api) {
    onAction('request', {
      method: 'post',
      API: api
    });
  }

  return /*#__PURE__*/_react["default"].createElement("span", {
    key: i,
    className: "ZEleA-table-action-Sort"
  }, index === 0 ? null : /*#__PURE__*/_react["default"].createElement(_icons.ArrowUpOutlined, {
    title: "\u4E0A\u79FB",
    onClick: handleUp
  }), index === records.length - 1 ? null : /*#__PURE__*/_react["default"].createElement(_icons.ArrowDownOutlined, {
    onClick: handleDown,
    title: "\u4E0B\u79FB"
  }));
};

exports["default"] = _default;