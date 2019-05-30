"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatToConfig;

function formatToConfig(cfg) {
  var _cfg$items = cfg.items,
      items = _cfg$items === void 0 ? [] : _cfg$items;
  var config = {
    layout: 'Empty',
    title: '表单',
    items: []
  };
  items.forEach(function (item) {
    config.items.push({
      layout: item.type,
      layoutConfig: {
        value: item.value
      },
      component: 'BaseForm',
      config: {
        fields: item.items.map(function (field) {
          return {
            label: field.title,
            field: field.options.base.field.value,
            type: field.type
          };
        })
      }
    });
  });
  return config;
}