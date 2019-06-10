import Item from './Item';
import { findNode, findEmptyNode } from './nodeTree';

export default function handleState(state, { type, payload = {} }) {
  const config = { ...state.config };
  const copyList = [...state.copyList];
  const typeMap = {
    save() {
      return {
        ...state,
        ...payload,
      }
    },
    initConfig() {
      return {
        ...state,
        config: payload,
      }
    },
    addLayout() {
      const index = config.items.length + 1;
      const { id = index, ...rest } = payload;
      config.items.splice(id - 1, 0,
        new Item(JSON.parse(JSON.stringify(rest)))
      );

      return {
        ...state,
        config: config,
      }
    },
    insertLayout() {
      config.items.push(new Item(JSON.parse(JSON.stringify(payload))));

      return {
        ...state,
        config: config,
      }
    },
    editRowValue() {
      const { id, value } = payload;
      const node = findNode(id, config);
      node.value = value;

      return {
        ...state,
        config: config,
      }
    },
    delRow() {
      const { id } = payload;
      config.items = config.items.filter(cfg => cfg.id !== id);

      return {
        ...state,
        config: config,
      }
    },
    addElement() {
      const { layoutId, ...rest } = payload;
      const node = findNode(layoutId, config);
      node.items[payload.index] = new Item({
        ...rest,
        parentId: node.id,
      });

      return {
        ...state,
        config: config,
      }
    },
    insertElement() {
      const node = findEmptyNode(config);
      if (!node.id) { // id === 0 or undefined
        return state;
      }

      const index = node.items.findIndex(e => !e);
      node.items[index] = new Item({
        ...payload,
        parentId: node.id,
        index,
      });

      return {
        ...state,
        config: config,
      }
    },
    editElement() {
      const node = findNode(payload.parentId, config);
      node.items[payload.index] = payload;

      return {
        ...state,
        config: config,
      }
    },
    delElement() {
      const node = findNode(payload.id, config);
      const rst = {};
      if (node.items[payload.index].id === state.current.id) {
        rst.current = {};
      }
      node.items[payload.index] = undefined;

      return {
        ...state,
        ...rst,
        config: config,
      }
    },
    copyElement() {
      const { id, index, parentId, ...rest } = payload;

      return {
        ...state,
        copyList: [
          ...copyList,
          JSON.parse(JSON.stringify(new Item(rest))),
        ],
      }
    },
    delCopyElement() {
      const { id } = payload;

      return {
        ...state,
        copyList: [
          ...copyList.filter(cfg => cfg.id !== id),
        ],
      }
    },
    currentEdit() {
      return {
        ...state,
        current: payload,
      }
    },
    defaults() {
      console.log('未定义的方法: ', type);
      return state;
    },
  };
  return (typeMap[type] || typeMap['defaults'])();
}