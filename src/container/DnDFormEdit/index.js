import React, { useReducer, useContext } from 'react';
import { Button, Spin, Input, Card } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import PageContext from 'zero-element/lib/context/PageContext';
import { Flex } from 'layout-flex';

import global from 'zero-element-global/lib/global';

import { unique } from '@/utils/tool';

import ComponentPanel from './ComponentPanel';
import Fields from './Fields';
import EchoPanel from './EchoPanel';
import AttributesPanel from './AttributesPanel';

import DnDContext from './utils/context';
import handleState from './utils/dispatchState';
import formatToConfig from './utils/format';
import { assigned, fieldCount, setInitId } from './utils/Item';

import Panel from '@/components/Panel';

const { FlexItem } = Flex;

const initState = {
  current: {}, // 当前编辑的元素
  name: '', // 表单名称
  fields: [],
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
  const { fields, config, copyList, spinning, spinningTip } = state;
  const { API, path } = props.config;
  const context = useContext(PageContext);
  const { namespace } = context;
  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData',
  }, props.config);
  const { router } = global;

  useDidMount(_ => {
    if (API.getAPI) {
      dispatch({
        type: 'save',
        payload: {
          spinning: true,
          spinningTip: '正在读取……',
        }
      });

      formProps.handle.onGetOne({})
        .then(({ code, data }) => {
          const { originConfig = {} } = data;
          if (code === 200) {
            dispatch({
              type: 'initConfig',
              payload: data,
            });
            setInitId(originConfig.finalId, originConfig.fieldCount);
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
        })
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

    const [data, otherFields] = formatToConfig(config, state.name);
    const method = API.updateAPI ?
      formProps.handle.onUpdateForm
      : formProps.handle.onCreateForm;

    method({
      fields: {
        title: state.name,
        config: data,
        fields: unique([fields, otherFields]),
        originConfig: {
          ...state.config,
          title: state.name,
          finalId: assigned,
          fieldCount: fieldCount,
        },
      },
    })
      .then(_ => {
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

  return <DnDContext.Provider value={state}>
    <Flex>
      <FlexItem flex={1}>
        <Spin spinning={spinning} tip={spinningTip}>
          <Card size="small">
            <div>
              <h3>表单名称：</h3>
              <Input value={state.name} onChange={handleName} />
            </div>
            <br />
            <Button type="primary" onClick={handleSave}>保存</Button>
          </Card>
          <br />
          <Panel title="表单字段">
            <Fields data={fields} dispatch={dispatch} />
          </Panel>
          <Panel title="表单画布">
            <EchoPanel config={config} dispatch={dispatch} />
          </Panel>
        </Spin>
      </FlexItem>
      <FlexItem style={{ width: '256px' }}>
        <ComponentPanel dispatch={dispatch} copyList={copyList} />
        <AttributesPanel
          current={state.current}
          dispatch={dispatch}
          fields={fields}
        />
      </FlexItem>
    </Flex>
  </DnDContext.Provider>
}

export default DragDropContext(HTML5Backend)(DndFormEdit);