"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ValueTypeImage;

require("antd/lib/modal/style/css");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

require("antd/lib/card/style/css");

var _card = _interopRequireDefault(require("antd/lib/card"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

function ValueTypeImage(props) {
  var _props$options = props.options,
      options = _props$options === void 0 ? {} : _props$options,
      _props$data$text = props.data.text,
      text = _props$data$text === void 0 ? '' : _props$data$text;
  var _options$max = options.max,
      max = _options$max === void 0 ? 9 : _options$max,
      _options$width = options.width,
      width = _options$width === void 0 ? 60 : _options$width,
      _options$height = options.height,
      height = _options$height === void 0 ? 60 : _options$height;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      previewImage = _useState4[0],
      setPreviewImage = _useState4[1];

  var list = format(text).slice(0, max - 1);

  function handleCancel() {
    setVisible(false);
  }

  function handlePreview(url) {
    setPreviewImage(url);
    setVisible(true);
  }

  return _react["default"].createElement(_react["default"].Fragment, null, list.map(function (item, i) {
    return _react["default"].createElement(_card["default"], {
      key: i,
      hoverable: true,
      style: {
        width: width,
        height: height
      },
      onClick: handlePreview.bind(null, item.url),
      bodyStyle: {
        padding: 0
      },
      cover: _react["default"].createElement("img", {
        alt: item.name,
        src: item.url
      })
    });
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
  } catch (e) {}

  rst.length > 0 && rst.map(function (item, index) {
    rst[index] = {
      id: index,
      url: item.url
    };
  });
  return rst;
}