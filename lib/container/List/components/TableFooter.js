"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var TableFooter =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(TableFooter, _React$Component);

  function TableFooter() {
    (0, _classCallCheck2["default"])(this, TableFooter);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TableFooter).apply(this, arguments));
  }

  (0, _createClass2["default"])(TableFooter, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          dataSource = _this$props.dataSource,
          columns = _this$props.columns;
      return _react["default"].createElement("table", {
        className: "ant-table"
      }, _react["default"].createElement("colgroup", null, columns.map(function (colModel, index) {
        return _react["default"].createElement("col", {
          style: {
            width: colModel.width,
            minWidth: colModel.width
          },
          key: index
        });
      })), _react["default"].createElement("tfoot", null, _react["default"].createElement("tr", null, columns.map(function (colum, idxCol) {
        return _react["default"].createElement("td", {
          style: {
            padding: "0px 8px"
          },
          className: colum.className,
          key: idxCol
        }, _react["default"].createElement("strong", null, dataSource && colum.footerSum ? "\u603B".concat(colum.title, " ").concat(dataSource.reduce(function (sum, record) {
          return sum + parseFloat(record[colum.dataIndex]);
        }, 0)) : ""));
      }))));
    }
  }]);
  return TableFooter;
}(_react["default"].Component);

var _default = TableFooter;
exports["default"] = _default;