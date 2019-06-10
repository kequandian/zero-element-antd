import React, { useReducer, useContext } from 'react';
import { Button, Spin } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import PageContext from 'zero-element/lib/context/PageContext';
import { Flex } from 'layout-flex';

import ComponentPanel from './ComponentPanel';
import EchoPanel from './EchoPanel';
import AttributesPanel from './AttributesPanel';

import DnDContext from './utils/context';
import handleState from './utils/dispatchState';
import formatToConfig from './utils/format';

const { FlexItem } = Flex;

const initState = {
  current: {},
  config: {
    id: 0,
    title: '画布',
    type: 'Canvas',
    items: [],
  },
  copyList: [],
  spinning: false,
  spinningTip: '',
};

function DndFormEdit(props) {
  const [state, dispatch] = useReducer(
    handleState,
    initState,
    () => JSON.parse(JSON.stringify(initState))
  );
  const { config, copyList, spinning, spinningTip } = state;
  const context = useContext(PageContext);
  const { namespace } = context;
  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData',
  }, props.config);

  useDidMount(_ => {
    if (props.config.API.getAPI) {
      formProps.handle.onGetOne({}).then(({ code, data }) => {
        if (code === 200) {
          dispatch({
            type: 'initConfig',
            payload: data,
          });
        }
      });
    }
  });

  function handleSave() {
    dispatch({
      type: 'save',
      payload: {
        spinning: true,
        spinningTip: '正在保存……',
      }
    });

    const data = formatToConfig(config);
    formProps.handle.onCreateForm({
      fields: {
        config: data,
        originConfig: state.config,
      },
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

  return <DnDContext.Provider value={state}>
    <Spin spinning={spinning} tip={spinningTip}>
      <Flex>
        <FlexItem>
          <Button type="primary" onClick={handleSave}>保存</Button>
        </FlexItem>
      </Flex>
      <Flex>
        <FlexItem flex={1}>
          <EchoPanel config={config} dispatch={dispatch} />
        </FlexItem>
        <FlexItem style={{ width: '256px' }}>
          <ComponentPanel dispatch={dispatch} copyList={copyList} />
          <AttributesPanel current={state.current} dispatch={dispatch} />
        </FlexItem>
      </Flex>
    </Spin>
  </DnDContext.Provider>
}

export default DragDropContext(HTML5Backend)(DndFormEdit);