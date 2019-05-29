import React, { useReducer } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Flex } from 'layout-flex';

import ComponentPanel from './ComponentPanel';
import EchoPanel from './EchoPanel';
import AttributesPanel from './AttributesPanel';

import Item from './utils/Item';
import DnDContext from './utils/context';
import handleState from './utils/dispatchState';

const { FlexItem } = Flex;

const initState = {
  current: {},
  config: new Item({
    id: 0,
    title: '画布',
    type: 'Canvas',
    items: [],
  }),
  copyList: [],
};

function DndFormEdit(props) {
  const [state, dispatch] = useReducer(handleState, initState);
  const { config, copyList } = state;

  return <DnDContext.Provider value={state}>
    <Flex>
      <FlexItem flex={1}>
        <EchoPanel config={config} dispatch={dispatch} />
      </FlexItem>
      <FlexItem style={{ width: '256px' }}>
        <ComponentPanel dispatch={dispatch} copyList={copyList} />
        <AttributesPanel current={state.current} dispatch={dispatch} />
      </FlexItem>
    </Flex>
  </DnDContext.Provider>
}

export default DragDropContext(HTML5Backend)(DndFormEdit);