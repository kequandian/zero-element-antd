"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatToConfig;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function formatToConfig(cfg) {
  var _ref, _ref2;

  var _cfg$items = cfg.items,
      items = _cfg$items === void 0 ? [] : _cfg$items;
  var config = {
    layout: 'Empty',
    title: '表单',
    items: []
  };
  var count = 0;
  config.items.push({
    layout: 'Empty',
    component: 'BaseForm',
    config: {
      layout: 'Grid',
      layoutConfig: {
        // value: item.value,
        layoutArea: (_ref = []).concat.apply(_ref, (0, _toConsumableArray2["default"])(items.map(function (row) {
          return {
            layout: row.type,
            length: row.items.length,
            value: row.value
          };
        })))
      },
      fields: (_ref2 = []).concat.apply(_ref2, (0, _toConsumableArray2["default"])(items.map(function (row) {
        return row.items.map(function (field) {
          if (!field) {
            return {
              label: '',
              field: "empty_".concat(count++),
              type: 'empty'
            };
          }

          return {
            label: field.title,
            field: field.options.base.field.value,
            type: field.type.toLowerCase()
          };
        });
      })))
    }
  }); // items.forEach(item => {
  //   config.items.push({
  //     // layout: item.type,
  //     layout: 'Empty',
  //     component: 'BaseForm',
  //     config: {
  //       layout: 'Grid',
  //       layoutConfig: {
  //         value: item.value,
  //       },
  //       fields: item.items.map((field, i) => {
  //         if (!field) {
  //           return {
  //             label: '',
  //             field: `empty_${i}`,
  //             type: 'empty',
  //           }
  //         }
  //         return {
  //           label: field.title,
  //           field: field.options.base.field.value,
  //           type: field.type.toLowerCase(),
  //         }
  //       })
  //     }
  //   });
  // });

  return config;
}