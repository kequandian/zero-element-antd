"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/spin/style/css");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/lib/card/style/css");

var _card = _interopRequireDefault(require("antd/lib/card"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _useBaseForm = _interopRequireDefault(require("zero-element/lib/helper/form/useBaseForm"));

var _PageContext = _interopRequireDefault(require("zero-element/lib/context/PageContext"));

var _layoutFlex = require("layout-flex");

var _ComponentPanel = _interopRequireDefault(require("./ComponentPanel"));

var _Fields = _interopRequireDefault(require("./Fields"));

var _EchoPanel = _interopRequireDefault(require("./EchoPanel"));

var _AttributesPanel = _interopRequireDefault(require("./AttributesPanel"));

var _context = _interopRequireDefault(require("./utils/context"));

var _dispatchState = _interopRequireDefault(require("./utils/dispatchState"));

var _format = _interopRequireDefault(require("./utils/format"));

var _Item = require("./utils/Item");

var _Panel = _interopRequireDefault(require("../../components/Panel"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var FlexItem = _layoutFlex.Flex.FlexItem;
var initState = {
  current: {},
  // 当前编辑的元素
  name: '',
  // 表单名称
  fields: [],
  config: {
    id: 0,
    title: '表单',
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

  var fields = state.fields,
      config = state.config,
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
        var _data$originConfig = data.originConfig,
            originConfig = _data$originConfig === void 0 ? {} : _data$originConfig;

        if (code === 200) {
          dispatch({
            type: 'initConfig',
            payload: data
          });
          (0, _Item.setInitId)(originConfig.finalId, originConfig.fieldCount);
        }
      });
    }
  });

  function handleName(e) {
    var name = e.target.value;
    dispatch({
      type: 'save',
      payload: {
        name: name
      }
    });
  }

  function handleSave() {
    dispatch({
      type: 'save',
      payload: {
        spinning: true,
        spinningTip: '正在保存……'
      }
    });
    var data = (0, _format["default"])(config, state.name);
    var method = props.config.API.updateAPI ? formProps.handle.onUpdateForm : formProps.handle.onCreateForm;
    method({
      fields: {
        title: state.name,
        config: data,
        originConfig: _objectSpread({}, state.config, {
          title: state.name,
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
  }, _react["default"].createElement(_spin["default"], {
    spinning: spinning,
    tip: spinningTip
  }, _react["default"].createElement(_card["default"], {
    size: "small"
  }, _react["default"].createElement("div", null, _react["default"].createElement("h3", null, "\u8868\u5355\u540D\u79F0\uFF1A"), _react["default"].createElement(_input["default"], {
    value: state.name,
    onChange: handleName
  })), _react["default"].createElement("br", null), _react["default"].createElement(_button["default"], {
    type: "primary",
    onClick: handleSave
  }, "\u4FDD\u5B58")), _react["default"].createElement("br", null), _react["default"].createElement(_Panel["default"], {
    title: "\u8868\u5355\u5B57\u6BB5"
  }, _react["default"].createElement(_Fields["default"], {
    data: fields,
    dispatch: dispatch
  })), _react["default"].createElement(_Panel["default"], {
    title: "\u8868\u5355\u753B\u5E03"
  }, _react["default"].createElement(_EchoPanel["default"], {
    config: config,
    dispatch: dispatch
  })))), _react["default"].createElement(FlexItem, {
    style: {
      width: '256px'
    }
  }, _react["default"].createElement(_ComponentPanel["default"], {
    dispatch: dispatch,
    copyList: copyList
  }), _react["default"].createElement(_AttributesPanel["default"], {
    current: state.current,
    dispatch: dispatch,
    fields: fields
  }))));
}

var _default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend["default"])(DndFormEdit);

exports["default"] = _default;