"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PCDMultiple;

require("antd/lib/spin/style/css");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _request = require("../../utils/request");

var _format = require("zero-element/lib/utils/format");

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _layoutFlex = require("layout-flex");

var _Container = _interopRequireDefault(require("./Container"));

var _tool = require("../../utils/tool");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var FlexItem = _layoutFlex.Flex.FlexItem;
var defaultDisable = {
  province: false,
  city: false,
  district: false
};

function PCDMultiple(props) {
  var className = props.className,
      value = props.value,
      options = props.options,
      namespace = props.namespace,
      onChange = props.onChange,
      handle = props.handle,
      rest = (0, _objectWithoutProperties2["default"])(props, ["className", "value", "options", "namespace", "onChange", "handle"]);
  var _options$API = options.API,
      API = _options$API === void 0 ? '/api/pcd/list' : _options$API,
      _options$dataField = options.dataField,
      dataField = _options$dataField === void 0 ? 'data' : _options$dataField,
      _options$label = options.label,
      optLabel = _options$label === void 0 ? 'name' : _options$label,
      _options$value = options.value,
      optValue = _options$value === void 0 ? 'id' : _options$value,
      _options$disable = options.disable,
      disable = _options$disable === void 0 ? defaultDisable : _options$disable;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      provinceList = _useState4[0],
      setProvinceList = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      province = _useState6[0],
      setProvince = _useState6[1]; // 当前点击的 省


  var _useState7 = (0, _react.useState)([]),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      cityList = _useState8[0],
      setCityList = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = (0, _slicedToArray2["default"])(_useState9, 2),
      city = _useState10[0],
      setCity = _useState10[1]; // 当前点击的 市


  var _useState11 = (0, _react.useState)([]),
      _useState12 = (0, _slicedToArray2["default"])(_useState11, 2),
      districtList = _useState12[0],
      setDistrictList = _useState12[1];

  var _useState13 = (0, _react.useState)(null),
      _useState14 = (0, _slicedToArray2["default"])(_useState13, 2),
      district = _useState14[0],
      setDistrict = _useState14[1]; // 当前点击的 区


  (0, _lifeCycle.useDidMount)(queryProvinceData);
  (0, _react.useEffect)(function (_) {
    if (province && !disable.city) {
      queryCityData(province);
      setCity([]);
      setDistrict([]);
      setCityList([]);
      setDistrictList([]);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [province, disable]);
  (0, _react.useEffect)(function (_) {
    if (city && !disable.district) {
      queryDistrictData(city);
      setDistrict([]);
      setDistrictList([]);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [city, disable]);

  function getData(queryData) {
    if (API) {
      var fAPI = (0, _format.formatAPI)(API, {
        namespace: namespace
      });
      setLoading(true);
      return (0, _request.query)(fAPI, queryData).then(function (data) {
        var list = Array.isArray(data) ? data : data[dataField];

        if (Array.isArray(list)) {
          return Promise.resolve(list);
        } else {
          console.warn("API ".concat(fAPI, " \u8FD4\u56DE\u7684 data \u9884\u671F\u5E94\u8BE5\u4E3A Array, \u5B9E\u9645: "), list);
          return Promise.reject();
        }
      })["finally"](function (_) {
        setLoading(false);
      });
    }

    return Promise.resolve([]);
  }

  function queryProvinceData() {
    getData({}).then(function (data) {
      setProvinceList(data);
    });
  }

  function queryCityData(id) {
    // const find = provinceList.find(p => p.id === id);
    getData({
      type: 'c',
      pid: id
    }).then(function (data) {
      setCityList(data);
    });
  }

  function queryDistrictData(id) {
    getData({
      type: 'd',
      pid: id
    }).then(function (data) {
      setDistrictList(data);
    });
  }

  function handleSelectProvince(data) {
    setProvince(data);
  }

  function handleSelectCity(data) {
    setCity(data);
  }

  function handleSelectDistrict(data) {
    setDistrict(data);
  }

  function handleAppendToValue(data) {
    var formatList = data.map(function (item) {
      return _objectSpread({}, item, {
        name: formatName(item)
      });
    });

    if (Array.isArray(value)) {
      onChange((0, _tool.uniqueObjList)(value, formatList));
    } else {
      onChange(formatList);
    }
  }

  function handleRemoteValue(data) {
    var vSet = new Set(data.map(function (i) {
      return i.id;
    }));
    onChange(value.filter(function (i) {
      return !vSet.has(i.id);
    }));
  }

  function formatName(item) {
    if (item.pid) {
      if (item.type === 'c') {
        var find = provinceList.find(function (i) {
          return i.id === item.pid;
        });
        return "".concat(find.name, "-").concat(item.name);
      }

      if (item.type === 'd') {
        var _find = cityList.find(function (i) {
          return i.id === item.pid;
        });

        return "".concat(formatName(_find), "-").concat(item.name);
      }
    }

    return item.name;
  }

  return _react["default"].createElement(_spin["default"], {
    className: className,
    spinning: loading
  }, _react["default"].createElement(_layoutFlex.Flex, null, _react["default"].createElement(FlexItem, {
    flex: 1
  }, _react["default"].createElement(_Container["default"], {
    title: "\u5DF2\u9009\u62E9",
    operationName: "\u79FB\u9664\u9009\u4E2D\u6570\u636E",
    keepSelected: true // onClick={onChange}
    ,
    onSelect: handleRemoteValue,
    listData: value,
    optLabel: optLabel,
    optValue: optValue
  })), disable.province ? null : _react["default"].createElement(FlexItem, {
    flex: 1
  }, _react["default"].createElement(_Container["default"], {
    title: "\u7701",
    operationName: "\u6DFB\u52A0\u9009\u4E2D\u7701",
    onClick: handleSelectProvince,
    onSelect: handleAppendToValue,
    listData: provinceList,
    optLabel: optLabel,
    optValue: optValue
  })), disable.city ? null : _react["default"].createElement(FlexItem, {
    flex: 1
  }, _react["default"].createElement(_Container["default"], {
    title: "\u5E02",
    operationName: "\u6DFB\u52A0\u9009\u4E2D\u5E02",
    onClick: handleSelectCity,
    onSelect: handleAppendToValue,
    listData: cityList,
    optLabel: optLabel,
    optValue: optValue
  })), disable.district ? null : _react["default"].createElement(FlexItem, {
    flex: 1
  }, _react["default"].createElement(_Container["default"], {
    title: "\u533A",
    operationName: "\u6DFB\u52A0\u9009\u4E2D\u533A",
    onClick: handleSelectDistrict,
    onSelect: handleAppendToValue,
    listData: districtList,
    optLabel: optLabel,
    optValue: optValue
  }))));
}