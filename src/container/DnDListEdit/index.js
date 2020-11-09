import React, { useReducer, useRef } from 'react';
import { Button, Spin, Input, Card, message } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import { Flex } from 'layout-flex';

import global from 'zero-element/lib/config/global';

import ComponentPanel from '@/container/DnDFormEdit/ComponentPanel';
import Fields from '@/container/DnDFormEdit/Fields';
import EchoPanel from '@/container/DnDFormEdit/EchoPanel';
import AttributesPanel from '@/container/DnDFormEdit/AttributesPanel';

import DnDContext from '@/container/DnDFormEdit/utils/context';
import handleState from '@/container/DnDFormEdit/utils/dispatchState';
import formatToConfig from '@/container/DnDFormEdit/utils/format';
import { assigned, fieldCount, setInitId } from '@/container/DnDFormEdit/utils/Item';

import Panel from '@/components/Panel';

const { FlexItem } = Flex;

const initState = {
  current: {}, // 当前编辑的元素
  name: '',
  fields: [],
  config: {
    id: 0,
    title: '列表',
    type: 'Canvas',
    items: [],
  },
  copyList: [],
  layoutType: 'horizontal',
  spinning: false,
  spinningTip: '',
};

function DnDListEdit(props) {
  const { namespace, onSubmit, initData } = props;
  const [state, dispatch] = useReducer(
    handleState,
    initState,
    () => JSON.parse(JSON.stringify(initState))
  );
  const {
    fields,
    config, copyList, layoutType,
    spinning, spinningTip
  } = state;
  const { API, path } = props.config;

  function handleSave() {
    const [data, otherFields] = formatToConfig(config, state.name, {
      layoutType,
    });
    const method = API.updateAPI ?
      formProps.handle.onUpdateForm
      : formProps.handle.onCreateForm;

    const submitData = {
      title: state.name,
      config: data,
      fields: fields.map(f => ({
        field: f,
        label: f,
      })),
      originConfig: {
        ...state.config,
        title: state.name,
        finalId: assigned,
        fieldCount: fieldCount,
      },
    };

    if (onSubmit) {
      onSubmit(submitData);
      return false;
    }

    dispatch({
      type: 'save',
      payload: {
        spinning: true,
        spinningTip: '正在保存……',
      }
    });

    method({
      fields: submitData,
    })
      .then(_ => {
        message.success('保存成功');
        if (path && router) {
          const fPath = formatAPI(path, {
            namespace,
          });
          router(fPath);
        }
      })
      .finally(_ => {
        dispatch({
          type: 'save',
          payload: {
            spinning: false,
            spinningTip: '',
          }
        });
      });
  }

  function renderSubmitButton() {
    if (typeof onSubmit === 'function') {
      return null;
    }
    return <>
      <br />
      <Button type="primary" onClick={handleSave}>保存</Button>
    </>
  }

  return <DnDContext.Provider value={state}>
    <Flex>
      <FlexItem flex={1}>
        <Spin spinning={spinning} tip={spinningTip}>
          {renderSubmitButton()}
          <br />
          <Panel title="">
            <EchoPanel
              layoutType={layoutType}
              config={config}
              dispatch={dispatch}
            />
          </Panel>
        </Spin>
      </FlexItem>
      <FlexItem style={{ width: '256px' }}>
        <ComponentPanel
          layoutType={layoutType}
          dispatch={dispatch}
          copyList={copyList}
        />
        <AttributesPanel
          current={state.current}
          dispatch={dispatch}
          fields={fields}
          API={API}
        />
      </FlexItem>
    </Flex>
  </DnDContext.Provider>
}
export default DragDropContext(HTML5Backend)(DnDListEdit);