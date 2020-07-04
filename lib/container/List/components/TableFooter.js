"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function tableFooter(dataSource, columns) {
  var footer = (0, _react.useRef)(null);

  if (footer.current === null) {
    footer.current = columns.some(function (i) {
      return i.footerSum;
    });
  }

  if (footer.current === true) {
    return function () {
      return /*#__PURE__*/_react["default"].createElement(TableFooter, {
        dataSource: dataSource,
        columns: columns
      });
    };
  }

  return undefined;
}

function TableFooter(props) {
  var dataSource = props.dataSource,
      columns = props.columns;
  return /*#__PURE__*/_react["default"].createElement("table", {
    className: "ant-table"
  }, /*#__PURE__*/_react["default"].createElement("colgroup", null, columns.map(function (colModel, index) {
    return /*#__PURE__*/_react["default"].createElement("col", {
      style: {
        width: colModel.width,
        minWidth: colModel.width
      },
      key: index
    });
  })), /*#__PURE__*/_react["default"].createElement("tfoot", null, /*#__PURE__*/_react["default"].createElement("tr", null, columns.map(function (colum, idxCol) {
    return /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        padding: "0px 8px"
      },
      className: colum.className,
      key: idxCol
    }, /*#__PURE__*/_react["default"].createElement("strong", null, dataSource && colum.footerSum ? "\u603B".concat(colum.title, " ").concat(dataSource.reduce(function (sum, record) {
      return sum + parseFloat(record[colum.dataIndex]);
    }, 0)) : ""));
  }))));
}

var _default = tableFooter;
exports["default"] = _default;