import React, { useState, useEffect } from 'react';
import { useDidMount } from '../../../utils/hooks/lifeCycle';
import { Icon } from 'antd';
import { PageConsumer } from '../../EventProxy/PageContext';
import { Consumer as ListConsumer } from '../../EventProxy/List/ListEventSet';
import DrawerContent from './DrawerContent';
import { getChecked, setChecked } from '../../../utils/advancedManage';

export default props => (
  <ListConsumer>
    {listContext => PageConsumer(ListFieldsEdit, {
      ...props,
      context: {
        ...listContext,
      }
    })}
  </ListConsumer>
);
const ListFieldsEdit = (props) => {
  const [visible, setVisibel] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const { pageContext, context } = props;
  const { namespace } = pageContext;
  const { advancedConfig = [], fieldsConfig, onChangeDisplayFields } = context;

  if (advancedConfig && advancedConfig.length === 0) {
    return '操作';
  }

  useDidMount(() => {
    setCheckedList(getChecked(namespace, fieldsConfig));
  });

  function onSwitchVisibel() {
    setVisibel(!visible);
  }
  function onSwitchChecked(data) {
    const field = data.field;
    let newCheckedList = [...checkedList];
    const index = newCheckedList.findIndex(key => key === field);
    if (index > -1) {
      newCheckedList.splice(index, 1);
    } else {
      newCheckedList.push(field);
    }
    setCheckedList(newCheckedList);
  }
  function onSaveFields() {
    setChecked(namespace, checkedList);
    onChangeDisplayFields(checkedList);
    onSwitchVisibel();
  }

  const drawerProps = {
    visible,
    onSwitchVisibel,
    advancedConfig,
    checkedList,
    onSwitchChecked,
    onSaveFields,
  };
  return <>
    <span style={{ paddingRight: '6px' }} onClick={onSwitchVisibel}>
      <Icon type="setting" />
    </span>
    <DrawerContent {...drawerProps} />
  </>
}