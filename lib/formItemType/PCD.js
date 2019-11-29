"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PCD;

require("antd/lib/spin/style/css");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireWildcard(require("react"));

var _request = require("../utils/request");

var _format = require("zero-element/lib/utils/format");

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _layoutFlex = require("layout-flex");

var Option = _select["default"].Option;

function PCD(props) {
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
      _options$map = options.map,
      map = _options$map === void 0 ? {
    p: 'province',
    c: 'city',
    d: 'district'
  } : _options$map;
  var onSaveOtherValue = handle.onSaveOtherValue,
      onGetFormData = handle.onGetFormData;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      provinceList = _useState4[0],
      setProvinceList = _useState4[1];

  var _useState5 = (0, _react.useState)({
    key: -1,
    label: ''
  }),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      province = _useState6[0],
      setProvince = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      cityList = _useState8[0],
      setCityList = _useState8[1];

  var _useState9 = (0, _react.useState)({
    key: -1,
    label: ''
  }),
      _useState10 = (0, _slicedToArray2["default"])(_useState9, 2),
      city = _useState10[0],
      setCity = _useState10[1];

  var _useState11 = (0, _react.useState)([]),
      _useState12 = (0, _slicedToArray2["default"])(_useState11, 2),
      districtList = _useState12[0],
      setDistrictList = _useState12[1];

  var _useState13 = (0, _react.useState)({
    key: -1,
    label: ''
  }),
      _useState14 = (0, _slicedToArray2["default"])(_useState13, 2),
      district = _useState14[0],
      setDistrict = _useState14[1];

  var formData = onGetFormData();
  (0, _lifeCycle.useDidMount)(queryProvinceData);
  (0, _react.useEffect)(function (_) {// TODO init defaultValue
  }, [formData]);
  (0, _react.useEffect)(function (_) {
    if (province.key) {
      queryCityData(province.key);
      setCity({
        key: -1,
        label: ''
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [province]);
  (0, _react.useEffect)(function (_) {
    if (city.key) {
      queryDistrictData(city.key);
      setDistrict({
        key: -1,
        label: ''
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [city]);

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

  function queryCityData(p) {
    getData({
      type: 'c',
      pid: p
    }).then(function (data) {
      setCityList(data);
    });
  }

  function queryDistrictData(p) {
    getData({
      type: 'd',
      pid: p
    }).then(function (data) {
      setDistrictList(data);
    });
  }

  function handlePChange(item) {
    setProvince(item);
    onSaveOtherValue(map.p, item.label);
  }

  function handleCChange(item) {
    setCity(item);
    onSaveOtherValue(map.c, item.label);
  }

  function handleDChange(item) {
    setDistrict(item);
    onSaveOtherValue(map.d, item.label);
  }

  return _react["default"].createElement(_spin["default"], {
    className: className,
    spinning: loading
  }, _react["default"].createElement(_layoutFlex.Flex, null, _react["default"].createElement(_select["default"], (0, _extends2["default"])({
    labelInValue: true,
    onChange: handlePChange,
    value: province
  }, rest), provinceList.map(function (opt) {
    return _react["default"].createElement(Option, {
      key: opt[optValue],
      value: opt[optValue]
    }, opt[optLabel]);
  })), _react["default"].createElement(_select["default"], (0, _extends2["default"])({
    labelInValue: true,
    onChange: handleCChange,
    value: city
  }, rest), cityList.map(function (opt) {
    return _react["default"].createElement(Option, {
      key: opt[optValue],
      value: opt[optValue]
    }, opt[optLabel]);
  })), _react["default"].createElement(_select["default"], (0, _extends2["default"])({
    labelInValue: true,
    onChange: handleDChange,
    value: district
  }, rest), districtList.map(function (opt) {
    return _react["default"].createElement(Option, {
      key: opt[optValue],
      value: opt[optValue]
    }, opt[optLabel]);
  }))));
}