"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Sub =
/*#__PURE__*/
function () {
  function Sub() {
    (0, _classCallCheck2["default"])(this, Sub);
    this.map = {};
  }

  (0, _createClass2["default"])(Sub, [{
    key: "recordOnChange",
    value: function recordOnChange(name, func) {
      this.map[name] = func;
    }
  }, {
    key: "subscriptionChange",
    value: function subscriptionChange(_ref) {
      var values = _ref.values;
    }
  }, {
    key: "changeValue",
    value: function changeValue(name, value) {
      if (this.map[name]) {
        this.map[name](value);
      }
    }
  }]);
  return Sub;
}();

var _default = Sub;
exports["default"] = _default;