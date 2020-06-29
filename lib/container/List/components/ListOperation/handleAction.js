"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handleAction;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _format = require("zero-element/lib/utils/format");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function handleAction(type, options, props, dispatch) {
  var record = props.record,
      handle = props.handle,
      model = props.model;
  var API = options.API,
      tips = options.tips,
      saveToForm = options.saveToForm;
  var namespace = model.namespace;

  function handleResponse(func) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    var rst = func.apply(void 0, rest);
    rst && rst.then(function (_) {
      if (handle.onRefresh) {
        handle.onRefresh();
      }
    })["catch"](function (_) {
      return 0;
    });
  }

  if (type === undefined) {
    console.warn('请指定 list operation 所用的 action');
    return false;
  }

  type = type.replace(/( |^)[a-z]/g, function (L) {
    return L.toUpperCase();
  });
  var actionFunc = handle["on".concat(type)];

  if (typeof actionFunc === 'function') {
    model.setRecord(record);

    if (handle.onClickOperation) {
      handle.onClickOperation(record);
    }

    if (saveToForm) {
      console.warn("saveToForm TODO");
    }

    if (type === 'Delete') {
      dispatch({
        type: 'openConfirm',
        payload: {
          title: tips || '确定要删除该项吗？',
          action: actionFunc.bind(null, {
            record: record
          })
        }
      });
    } else {
      var payloadData = {
        record: record,
        options: _objectSpread({}, options, {
          API: API ? (0, _format.formatAPI)(API, {
            namespace: namespace
          }) : API
        })
      };

      if (tips) {
        dispatch({
          type: 'openConfirm',
          payload: {
            title: tips,
            action: handleResponse.bind(null, actionFunc, payloadData, model)
          }
        });
      } else {
        handleResponse(actionFunc, payloadData, model); // rst && rst.then(_ => {
        //   if (handle.onRefresh) {
        //     handle.onRefresh();
        //   }
        // }).catch(_ => 0);
      }
    }
  } else {
    console.warn("\u672A\u6CE8\u518C\u7684\u4E8B\u4EF6\uFF1A on".concat(type));
  }
}