"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _useBaseForm = _interopRequireDefault(require("zero-element/lib/helper/form/useBaseForm"));

var _PageContext = _interopRequireDefault(require("zero-element/lib/context/PageContext"));

var _layoutFlex = require("layout-flex");

var _ComponentPanel = _interopRequireDefault(require("./ComponentPanel"));

var _EchoPanel = _interopRequireDefault(require("./EchoPanel"));

var _AttributesPanel = _interopRequireDefault(require("./AttributesPanel"));

var _context = _interopRequireDefault(require("./utils/context"));

var _dispatchState = _interopRequireDefault(require("./utils/dispatchState"));

var _format = _interopRequireDefault(require("./utils/format"));

var _Item = require("./utils/Item");

var FlexItem = _layoutFlex.Flex.FlexItem;
var initState = {
  current: {},
  config: {
    id: 0,
    title: '画布',
    type: 'Canvas',
    items: []
  },
  copyList: [],
  spinning: false,
  spinningTip: ''
};

function DndFormEdit(props) {
  var _useReducer = (0, _react.useReducer)(_dispatchState["default"], initState, function () {
    return JSON.parse(JSON.stringify(initState));
  }),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var config = state.config,
      copyList = state.copyList,
      spinning = state.spinning,
      spinningTip = state.spinningTip;
  var context = (0, _react.useContext)(_PageContext["default"]);
  var namespace = context.namespace;
  var formProps = (0, _useBaseForm["default"])({
    namespace: namespace,
    modelPath: 'formData'
  }, props.config);
  (0, _lifeCycle.useDidMount)(function (_) {
    if (props.config.API.getAPI) {
      formProps.handle.onGetOne({}).then(function (_ref) {
        var code = _ref.code,
            data = _ref.data;

        if (code === 200) {
          dispatch({
            type: 'initConfig',
            payload: data
          });
          (0, _Item.setInitId)(data.finalId, data.fieldCount);
        }
      });
    }
  });

  function handleSave() {
    dispatch({
      type: 'save',
      payload: {
        spinning: true,
        spinningTip: '正在保存……'
      }
    });
    var data = (0, _format["default"])(config);
    formProps.handle.onCreateForm({
      fields: {
        config: data,
        originConfig: (0, _objectSpread2["default"])({}, state.config, {
          finalId: _Item.assigned,
          fieldCount: _Item.fieldCount
        })
      }
    })["finally"](function (_) {
      dispatch({
        type: 'save',
        payload: {
          spinning: false,
          spinningTip: ''
        }
      });
    });
  }

  return _react["default"].createElement(_context["default"].Provider, {
    value: state
  }, _react["default"].createElement(_layoutFlex.Flex, null, _react["default"].createElement(FlexItem, {
    flex: 1
  }, _react["default"].createElement(_antd.Spin, {
    spinning: spinning,
    tip: spinningTip
  }, _react["default"].createElement(_antd.Button, {
    type: "primary",
    onClick: handleSave
  }, "\u4FDD\u5B58"), _react["default"].createElement(_EchoPanel["default"], {
    config: config,
    dispatch: dispatch
  }))), _react["default"].createElement(FlexItem, {
    style: {
      width: '256px'
    }
  }, _react["default"].createElement(_ComponentPanel["default"], {
    dispatch: dispatch,
    copyList: copyList
  }), _react["default"].createElement(_AttributesPanel["default"], {
    current: state.current,
    dispatch: dispatch
  }))));
}

var _default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend["default"])(DndFormEdit);

exports["default"] = _default;