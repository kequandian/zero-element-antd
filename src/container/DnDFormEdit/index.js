import React, { useReducer, useContext } from 'react';
import { Button, Spin, Input } from 'antd';
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
import { assigned, fieldCount, setInitId } from './utils/Item';

const { FlexItem } = Flex;

const initState = {
  current: {},
  name: '',
  config: {
    id: 0,
    title: '表单',
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
        const { originConfig = {} } = data;
        if (code === 200) {
          dispatch({
            type: 'initConfig',
            payload: data,
          });
          setInitId(originConfig.finalId, originConfig.fieldCount);
        }
      });
    }
  });

  function handleName(e) {
    const name = e.target.value;
    dispatch({
      type: 'save',
      payload: {
        name,
      }
    });
  }
  function handleSave() {
    dispatch({
      type: 'save',
      payload: {
        spinning: true,
        spinningTip: '正在保存……',
      }
    });

    const data = formatToConfig(config);
    const method = props.config.API.updateAPI ?
      formProps.handle.onUpdateForm : formProps.handle.onCreateForm;
    method({
      fields: {
        title: state.name,
        config: data,
        originConfig: {
          ...state.config,
          title: state.name,
          finalId: assigned,
          fieldCount: fieldCount,
        },
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
    <div>
      <h3>表单名称：</h3>
      <Input value={state.name} onChange={handleName} />
    </div>
    <br />
    <Flex>
      <FlexItem flex={1}>
        <Spin spinning={spinning} tip={spinningTip}>
          <Button type="primary" onClick={handleSave}>保存</Button>
          <br /><br />
          <EchoPanel config={config} dispatch={dispatch} />
        </Spin>
      </FlexItem>
      <FlexItem style={{ width: '256px' }}>
        <ComponentPanel dispatch={dispatch} copyList={copyList} />
        <AttributesPanel current={state.current} dispatch={dispatch} />
      </FlexItem>
    </Flex>
  </DnDContext.Provider>
}

export default DragDropContext(HTML5Backend)(DndFormEdit);