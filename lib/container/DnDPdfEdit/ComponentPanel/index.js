"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/drawer/style/css");

var _drawer = _interopRequireDefault(require("antd/lib/drawer"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _RightClick = _interopRequireDefault(require("./components/RightClick"));

var _LayoutType = _interopRequireDefault(require("../compoments/LayoutType"));

var _ElementType = _interopRequireDefault(require("../compoments/ElementType"));

var _layout = _interopRequireDefault(require("./layout.config"));

var _element = _interopRequireDefault(require("./element.config"));

require("../index.css");

// import GlobalStyle from './components/GlobalStyle';
function Render(_ref) {
  var cfg = _ref.cfg,
      dispatch = _ref.dispatch;
  var title = cfg.title,
      type = cfg.type,
      options = cfg.options;

  if (options) {
    return _react["default"].createElement(_ElementType["default"], {
      title: title,
      type: type,
      options: JSON.parse(JSON.stringify(options)),
      dispatch: dispatch
    });
  }

  return _react["default"].createElement(_LayoutType["default"], (0, _extends2["default"])({}, cfg, {
    dispatch: dispatch
  }));
}

var _default = function _default(_ref2) {
  var layoutType = _ref2.layoutType,
      dispatch = _ref2.dispatch,
      copyList = _ref2.copyList;
  return _react["default"].createElement(_drawer["default"], {
    visible: true,
    mask: false,
    closable: false
  }, _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u5E03\u5C40\u7EC4\u4EF6"), _layout["default"].map(function (cfg, i) {
    return _react["default"].createElement(Render, {
      key: i,
      cfg: cfg,
      dispatch: dispatch
    });
  }), _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u57FA\u672C\u7EC4\u4EF6"), _element["default"].map(function (cfg, i) {
    return _react["default"].createElement(Render, {
      key: i,
      cfg: cfg,
      dispatch: dispatch
    });
  }), copyList.length ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u590D\u5236\u7EC4\u4EF6"), copyList.map(function (cfg, i) {
    return _react["default"].createElement(_RightClick["default"], {
      key: i,
      dispatch: dispatch,
      data: cfg
    }, _react["default"].createElement(Render, {
      cfg: cfg,
      dispatch: dispatch
    }));
  })) : null);
};

exports["default"] = _default;