"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ImageView;

require("antd/lib/modal/style/css");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

function ImageView(props) {
  var value = props.value,
      _props$max = props.max,
      max = _props$max === void 0 ? 9 : _props$max,
      _props$width = props.width,
      width = _props$width === void 0 ? 60 : _props$width,
      _props$height = props.height,
      height = _props$height === void 0 ? 60 : _props$height,
      circle = props.circle,
      border = props.border;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      previewImage = _useState4[0],
      setPreviewImage = _useState4[1];

  var list = format(value).slice(0, max - 1);

  function handleCancel() {
    setVisible(false);
  }

  function handlePreview(url) {
    setPreviewImage(url);
    setVisible(true);
  }

  var className = ['ZEleA-ImageView-container', circle ? 'circle' : '', border ? 'border' : ''].join(' ');
  return _react["default"].createElement(_react["default"].Fragment, null, list.map(function (item, i) {
    return _react["default"].createElement("div", {
      className: className,
      key: i,
      style: {
        width: width,
        height: height
      },
      onClick: handlePreview.bind(null, item.url)
    }, _react["default"].createElement("div", {
      className: "img",
      style: {
        backgroundImage: "url(".concat(item.url, ")")
      }
    }));
  }), _react["default"].createElement(_modal["default"], {
    visible: visible,
    footer: null,
    onCancel: handleCancel
  }, _react["default"].createElement("img", {
    alt: "image",
    style: {
      width: '100%'
    },
    src: previewImage
  })));
}

function format(value) {
  var rst = [];

  try {
    if (typeof value === 'string') {
      rst = JSON.parse(value);
    } else if (Array.isArray(value)) {
      rst = value;
    }
  } catch (e) {
    rst.push({
      url: value
    });
  }

  rst.length > 0 && rst.map(function (item, index) {
    rst[index] = {
      id: index,
      url: item.url
    };
  });
  return Array.isArray(rst) ? rst : [];
}