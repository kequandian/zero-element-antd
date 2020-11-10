import React, { useReducer, useRef } from 'react';
import { Button, Spin, Input, Card, message } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import { Flex } from 'layout-flex';
import global from 'zero-element/lib/config/global';
import ComponentPanel from "../DnDFormEdit/ComponentPanel";
import Fields from "../DnDFormEdit/Fields";
import EchoPanel from "../DnDFormEdit/EchoPanel";
import AttributesPanel from "../DnDFormEdit/AttributesPanel";
import DnDContext from "../DnDFormEdit/utils/context";
import handleState from "../DnDFormEdit/utils/dispatchState";
import formatToTableConfig from "../DnDFormEdit/utils/format/table";
import { assigned, fieldCount, setInitId } from "../DnDFormEdit/utils/Item";
import Panel from "../../components/Panel";
const {
  FlexItem
} = Flex;
const initState = {
  current: {},
  // 当前编辑的元素
  name: '表格',
  fields: [],
  config: {
    id: 0,
    title: '列表',
    type: 'Canvas',
    items: []
  },
  copyList: [],
  layoutType: 'horizontal',
  spinning: false,
  spinningTip: ''
};

function DnDListEdit(props) {
  const {
    namespace,
    onSubmit,
    initData
  } = props;
  const [state, dispatch] = useReducer(handleState, initState, () => JSON.parse(JSON.stringify(initState)));
  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData'
  }, props.config);
  const {
    fields,
    config,
    copyList,
    layoutType,
    spinning,
    spinningTip
  } = state;
  const {
    API,
    path
  } = props.config;

  function handleSave() {
    const [data, otherFields] = formatToTableConfig(config, state.name, {
      layoutType
    });
    const method = API.updateAPI ? formProps.handle.onUpdateForm : formProps.handle.onCreateForm;
    const submitData = {
      title: state.name,
      config: data,
      fields: fields.map(f => ({
        field: f,
        label: f
      })),
      originConfig: { ...state.config,
        title: state.name,
        finalId: assigned,
        fieldCount: fieldCount
      }
    };

    if (onSubmit) {
      onSubmit(submitData);
      return false;
    }

    dispatch({
      type: 'save',
      payload: {
        spinning: true,
        spinningTip: '正在保存……'
      }
    });
    method({
      fields: submitData
    }).then(_ => {
      message.success('保存成功');

      if (path && router) {
        const fPath = formatAPI(path, {
          namespace
        });
        router(fPath);
      }
    }).finally(_ => {
      dispatch({
        type: 'save',
        payload: {
          spinning: false,
          spinningTip: ''
        }
      });
    });
  }

  function renderSubmitButton() {
    if (typeof onSubmit === 'function') {
      return null;
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      onClick: handleSave
    }, "\u4FDD\u5B58"));
  }

  return /*#__PURE__*/React.createElement(DnDContext.Provider, {
    value: state
  }, /*#__PURE__*/React.createElement(Flex, null, /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement(Spin, {
    spinning: spinning,
    tip: spinningTip
  }, renderSubmitButton(), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Panel, {
    title: ""
  }, /*#__PURE__*/React.createElement(EchoPanel, {
    layoutType: layoutType,
    config: config,
    dispatch: dispatch
  })))), /*#__PURE__*/React.createElement(FlexItem, {
    style: {
      width: '256px'
    }
  }, /*#__PURE__*/React.createElement(ComponentPanel, {
    layoutType: layoutType,
    dispatch: dispatch,
    copyList: copyList
  }), /*#__PURE__*/React.createElement(AttributesPanel, {
    current: state.current,
    dispatch: dispatch,
    fields: fields,
    API: API
  }))));
}

export default DragDropContext(HTML5Backend)(DnDListEdit);