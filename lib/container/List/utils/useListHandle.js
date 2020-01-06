"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useListHandle;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _useBaseList = _interopRequireDefault(require("zero-element/lib/helper/list/useBaseList"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _useOperation3 = _interopRequireDefault(require("./useOperation"));

var _useRowSelection3 = _interopRequireDefault(require("./useRowSelection"));

var _format = require("./format");

var _readConfig = require("../../../utils/readConfig");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useListHandle(_ref) {
  var namespace = _ref.namespace,
      extraData = _ref.extraData,
      config = _ref.config,
      props = _ref.props;
  var listProps = (0, _useBaseList["default"])({
    namespace: namespace,
    modelPath: 'listData',
    extraData: extraData
  }, config);

  var _useOperation = (0, _useOperation3["default"])(),
      _useOperation2 = (0, _slicedToArray2["default"])(_useOperation, 2),
      oData = _useOperation2[0],
      onClickOperation = _useOperation2[1];

  var firstGetList = (0, _react.useRef)(true);
  var forceInitList = props.forceInitList,
      keepData = props.keepData,
      batchOperation = props.batchOperation,
      _props$pagination = props.pagination,
      propsPagination = _props$pagination === void 0 ? true : _props$pagination,
      _props$mountFetch = props.mountFetch,
      mountFetch = _props$mountFetch === void 0 ? true : _props$mountFetch;
  var _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API,
      pageSize = config.pageSize,
      fields = config.fields,
      operation = config.operation,
      _config$actions = config.actions,
      actions = _config$actions === void 0 ? [] : _config$actions;
  var loading = listProps.loading,
      data = listProps.data,
      handle = listProps.handle,
      modelStatus = listProps.modelStatus;
  var onGetList = handle.onGetList,
      onClearList = handle.onClearList,
      onCanRecyclable = handle.onCanRecyclable;

  var _useRowSelection = (0, _useRowSelection3["default"])(handle),
      _useRowSelection2 = (0, _slicedToArray2["default"])(_useRowSelection, 2),
      rowSelection = _useRowSelection2[0],
      onSetSelection = _useRowSelection2[1];

  var listData = modelStatus.listData;
  var records = listData.records,
      pagination = (0, _objectWithoutProperties2["default"])(listData, ["records"]);

  var _formatTableFields = (0, _format.formatTableFields)(fields, operation, _objectSpread({}, handle, {
    onClickOperation: onClickOperation
  }), {
    namespace: namespace,
    extraData: extraData
  }),
      columns = _formatTableFields.columns,
      width = _formatTableFields.width;

  (0, _lifeCycle.useDidMount)(function (_) {
    if (mountFetch && API.listAPI) {
      onGetList(_objectSpread({
        pageSize: pageSize
      }, pagination));
    }
  });
  (0, _react.useEffect)(function (_) {
    if (firstGetList.current) {
      firstGetList.current = false;
    } else {
      if (forceInitList !== undefined && API.listAPI) {
        onGetList(_objectSpread({
          pageSize: pageSize
        }, pagination));
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [forceInitList]);
  (0, _react.useEffect)(function (_) {
    if (batchOperation !== undefined) {
      onSetSelection(batchOperation);
    }
  }, [batchOperation]);
  (0, _lifeCycle.useWillUnmount)(function (_) {
    if (keepData) {
      onCanRecyclable();
    } else {
      onClearList();
    }
  });

  function handlePageChange(current, pageSize) {
    onGetList({
      current: current,
      pageSize: pageSize
    });
  }

  var tableProps = {
    columns: columns,
    loading: loading,
    rowSelection: batchOperation ? rowSelection : undefined,
    pagination: propsPagination ? _objectSpread({
      showSizeChanger: true
    }, pagination, {
      onChange: handlePageChange,
      onShowSizeChange: handlePageChange
    }) : false
  };

  if (width > 0) {
    tableProps.scroll = {
      x: width
    };
  }

  var actionsItems = actions.map(function (action, i) {
    return (0, _readConfig.getActionItem)(_objectSpread({
      key: i
    }, action), modelStatus, handle, {
      namespace: namespace,
      extraData: extraData
    });
  });
  return [tableProps, data, handle, actionsItems, {
    operationData: oData
  }];
}