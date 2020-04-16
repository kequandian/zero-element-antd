"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Captcha;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _react = _interopRequireWildcard(require("react"));

var _storage = require("zero-element/lib/utils/storage");

var _request = require("../utils/request");

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _useInterval = _interopRequireDefault(require("../utils/hooks/useInterval"));

var InputGroup = _input["default"].Group;
var typeMap = {
  'email': 'EmailValidate',
  'phone': 'PhoneValidate'
};

function Captcha(props) {
  var options = props.options,
      onChange = props.onChange,
      formdata = props.formdata,
      _props$props = props.props,
      propsOtp = _props$props === void 0 ? {} : _props$props;
  var _options$API = options.API,
      API = _options$API === void 0 ? '/api/pub/validateCodes/send' : _options$API,
      _options$label = options.label,
      label = _options$label === void 0 ? '获取' : _options$label,
      _options$type = options.type,
      type = _options$type === void 0 ? 'emali' : _options$type,
      field = options.field;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      cd = _useState2[0],
      setCd = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      count = _useState4[0],
      setCount = _useState4[1];

  var value = formdata[field];
  (0, _lifeCycle.useDidMount)(function (_) {
    var time = _storage.LS.get('captcha');

    if (time) {
      var endTiem = Number(time);

      if (endTiem > +new Date()) {
        setCd(true);
        setCount(~~((endTiem - new Date()) / 1000));
        setTimerStart();
      }
    }
  });
  (0, _useInterval["default"])(function () {
    if (count <= 0) {
      setCd(false);
    } else {
      setCount(count - 1);
    }
  }, cd ? 1000 : null);

  function getCaptcha() {
    _storage.LS.set('captcha', +new Date() + 60000);

    setCd(true);
    setCount(60);
    setTimerStart();
    sendCaptcha();
  }

  function setTimerStart() {
    setCd(true);
  }

  function sendCaptcha() {
    if (type && value) {
      (0, _request.post)(API, {
        type: typeMap[type],
        receiver: value
      }, {
        message: '验证码已发送'
      });
    }
  }

  return /*#__PURE__*/_react["default"].createElement(InputGroup, (0, _extends2["default"])({
    compact: true
  }, propsOtp), /*#__PURE__*/_react["default"].createElement(_input["default"], {
    style: {
      width: '70%'
    },
    prefix: /*#__PURE__*/_react["default"].createElement(_icon["default"], {
      type: "key",
      style: {
        color: 'rgba(0,0,0,.25)'
      }
    }),
    placeholder: "\u9A8C\u8BC1\u7801",
    onChange: onChange
  }), /*#__PURE__*/_react["default"].createElement(_button["default"], {
    style: {
      width: '30%'
    },
    disabled: !value || cd,
    onClick: getCaptcha
  }, cd ? count : label));
}