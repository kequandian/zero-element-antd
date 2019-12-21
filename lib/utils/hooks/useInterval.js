"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useInterval;

var _react = _interopRequireWildcard(require("react"));

/**
 * by Dan Abramov
 *
 * @param {function} callback
 * @param {number} delay
 */
function useInterval(callback, delay) {
  var savedCallback = (0, _react.useRef)(); // 保存新回调

  (0, _react.useEffect)(function () {
    savedCallback.current = callback;
  }); // 建立 interval

  (0, _react.useEffect)(function () {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      var id = setInterval(tick, delay);
      return function () {
        return clearInterval(id);
      };
    }
  }, [delay]);
}