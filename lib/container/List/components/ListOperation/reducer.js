"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reducer;

function reducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;
  var map = {
    openConfirm: function openConfirm() {
      return {
        confirm: true,
        title: payload.title,
        action: payload.action
      };
    },
    closeConfirm: function closeConfirm() {
      return {
        confirm: false,
        title: '',
        action: null
      };
    },
    openModal: function openModal() {
      return {
        modalTitle: payload.modalTitle,
        modalWidth: payload.modalWidth,
        modalConfig: payload.modalConfig,
        onSubmit: payload.onSubmit,
        data: payload.data,
        modal: true
      };
    },
    closeModal: function closeModal() {
      return {
        modalTitle: '',
        modalWidth: undefined,
        modalConfig: {},
        onSubmit: undefined,
        data: undefined,
        modal: false
      };
    },
    defaults: function defaults() {
      console.warn("\u672A\u5B9A\u4E49\u7684\u65B9\u6CD5: ".concat(type));
      return state;
    }
  };
  return (map[type] || map['defaults'])();
}