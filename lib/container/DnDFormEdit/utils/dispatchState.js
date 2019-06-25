"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handleState;

require("antd/lib/message/style/css");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _Item = _interopRequireWildcard(require("./Item"));

var _nodeTree = require("./nodeTree");

function handleState(state, _ref) {
  var type = _ref.type,
      _ref$payload = _ref.payload,
      payload = _ref$payload === void 0 ? {} : _ref$payload;
  var config = (0, _objectSpread2["default"])({}, state.config);
  var copyList = (0, _toConsumableArray2["default"])(state.copyList);
  var typeMap = {
    save: function save() {
      return (0, _objectSpread2["default"])({}, state, payload);
    },
    initConfig: function initConfig() {
      return (0, _objectSpread2["default"])({}, state, {
        config: payload.originConfig,
        name: payload.title
      });
    },
    addLayout: function addLayout() {
      var index = config.items.length + 1;
      var _payload$id = payload.id,
          id = _payload$id === void 0 ? index : _payload$id,
          rest = (0, _objectWithoutProperties2["default"])(payload, ["id"]);
      config.items.splice(id - 1, 0, new _Item["default"](JSON.parse(JSON.stringify(rest))));
      return (0, _objectSpread2["default"])({}, state, {
        config: config
      });
    },
    insertLayout: function insertLayout() {
      config.items.push(new _Item["default"](JSON.parse(JSON.stringify(payload))));
      return (0, _objectSpread2["default"])({}, state, {
        config: config
      });
    },
    rowMoveUp: function rowMoveUp() {
      if (config.items.length < 2) return state;
      var index = config.items.findIndex(function (row) {
        return row === payload;
      });
      var arr = config.items;

      if (index > 0) {
        var _ref2 = [arr[index], arr[index - 1]];
        arr[index - 1] = _ref2[0];
        arr[index] = _ref2[1];
        return (0, _objectSpread2["default"])({}, state, {
          config: config
        });
      } else {
        return state;
      }
    },
    rowMoveDown: function rowMoveDown() {
      if (config.items.length < 2) return state;
      var index = config.items.findIndex(function (row) {
        return row === payload;
      });
      var arr = config.items;

      if (index < config.items.length) {
        var _ref3 = [arr[index + 1], arr[index]];
        arr[index] = _ref3[0];
        arr[index + 1] = _ref3[1];
        return (0, _objectSpread2["default"])({}, state, {
          config: config
        });
      } else {
        return state;
      }
    },
    editRowValue: function editRowValue() {
      var id = payload.id,
          value = payload.value;
      var node = (0, _nodeTree.findNode)(id, config);
      node.value = value;

      if (node.value.length > node.items.length) {
        var _node$items;

        (_node$items = node.items).splice.apply(_node$items, [node.items.length, 0].concat((0, _toConsumableArray2["default"])(Array(node.value.length - node.items.length))));
      } else if (node.value.length !== node.items.length) {
        node.items.splice(node.value.length);
      }

      return (0, _objectSpread2["default"])({}, state, {
        config: config
      });
    },
    delRow: function delRow() {
      var id = payload.id;
      config.items = config.items.filter(function (cfg) {
        return cfg.id !== id;
      });

      if (config.items.length === 0) {
        (0, _Item.setInitId)(1, 1);
      }

      return (0, _objectSpread2["default"])({}, state, {
        config: config
      });
    },
    addElement: function addElement() {
      var layoutId = payload.layoutId,
          rest = (0, _objectWithoutProperties2["default"])(payload, ["layoutId"]);
      var node = (0, _nodeTree.findNode)(layoutId, config);
      node.items[payload.index] = new _Item["default"]((0, _objectSpread2["default"])({}, rest, {
        parentId: node.id
      }));
      return (0, _objectSpread2["default"])({}, state, {
        config: config
      });
    },
    insertElement: function insertElement() {
      var node = (0, _nodeTree.findEmptyNode)(config);

      if (!node.id) {
        // id === 0 or undefined
        return state;
      }

      var index = node.items.findIndex(function (e) {
        return !e;
      });
      node.items[index] = new _Item["default"]((0, _objectSpread2["default"])({}, payload, {
        parentId: node.id,
        index: index
      }));
      return (0, _objectSpread2["default"])({}, state, {
        config: config
      });
    },
    editElement: function editElement() {
      var node = (0, _nodeTree.findNode)(payload.parentId, config);
      node.items[payload.index] = payload;
      return (0, _objectSpread2["default"])({}, state, {
        config: config
      });
    },
    delElement: function delElement() {
      var node = (0, _nodeTree.findNode)(payload.id, config);
      var rst = {};

      if (node.items[payload.index].id === state.current.id) {
        rst.current = {};
      }

      node.items[payload.index] = undefined;
      return (0, _objectSpread2["default"])({}, state, rst, {
        config: config
      });
    },
    copyElement: function copyElement() {
      var id = payload.id,
          index = payload.index,
          parentId = payload.parentId,
          rest = (0, _objectWithoutProperties2["default"])(payload, ["id", "index", "parentId"]);
      return (0, _objectSpread2["default"])({}, state, {
        copyList: [].concat((0, _toConsumableArray2["default"])(copyList), [JSON.parse(JSON.stringify(new _Item["default"](rest)))])
      });
    },
    pasteElement: function pasteElement() {
      var layoutId = payload.layoutId,
          index = payload.index;

      if (copyList.length > 0) {
        var node = (0, _nodeTree.findNode)(layoutId, config);
        node.items[index] = new _Item["default"]((0, _objectSpread2["default"])({}, copyList[copyList.length - 1], {
          index: index,
          parentId: node.id
        }));
        return (0, _objectSpread2["default"])({}, state, {
          config: config
        });
      } else {
        _message2["default"].info('暂无可粘贴的内容');

        return state;
      }
    },
    delCopyElement: function delCopyElement() {
      var id = payload.id;
      return (0, _objectSpread2["default"])({}, state, {
        copyList: (0, _toConsumableArray2["default"])(copyList.filter(function (cfg) {
          return cfg.id !== id;
        }))
      });
    },
    currentEdit: function currentEdit() {
      return (0, _objectSpread2["default"])({}, state, {
        current: payload
      });
    },
    defaults: function defaults() {
      console.log('未定义的方法: ', type);
      return state;
    }
  };
  return (typeMap[type] || typeMap['defaults'])();
}