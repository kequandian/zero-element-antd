"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _react = _interopRequireDefault(require("react"));

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

  return _react["default"].createElement("span", {
    key: i,
    className: "ZEleA-table-action-Sort"
  }, index === 0 ? null : _react["default"].createElement(_icon["default"], {
    type: "arrow-up",
    title: "\u4E0A\u79FB",
    onClick: handleUp
  }), index === records.length - 1 ? null : _react["default"].createElement(_icon["default"], {
    onClick: handleDown,
    type: "arrow-down",
    title: "\u4E0B\u79FB"
  }));
};

exports["default"] = _default;