import { set as LayoutSet } from 'zero-element-global/lib/layout';
import { set as CSet } from 'zero-element-global/lib/container';
import { set as LASet } from 'zero-element-global/lib/listAction';
import { set as FITSet } from 'zero-element-global/lib/formItemType';
import { set as AITSet } from 'zero-element-global/lib/actionItemType';

import Grid from '@/layout/Grid';
import Content from '@/layout/Content';

import BaseList from '@/container/List/BaseList';
import BaseChildren from '@/container/List/BaseChildren';
import BaseSearch from '@/container/Form/BaseSearch';
import BaseForm from '@/container/Form/BaseForm';
import DnDFormEdit from '@/container/DnDFormEdit';

import onModal from '@/listAction/onModal';

import Plain from '@/formItemType/Plain';
import Input from '@/formItemType/Input';
import Radio from '@/formItemType/Radio';
import Checkbox from '@/formItemType/Checkbox';
import SelectFetch from '@/formItemType/SelectFetch';

import Modal from '@/actionItemType/Modal';
import ChildrenModal from '@/actionItemType/ChildrenModal';

LayoutSet({
  'Empty': ({ children }) => children,
  Grid,
  Content,
});

CSet({
  BaseList,
  BaseChildren,
  BaseSearch,
  BaseForm,
  DnDFormEdit,
});

LASet({
  onModal,
});

FITSet({
  'plain': Plain,
  input: Input,
  'radio': Radio,
  'checkbox': Checkbox,
  'select-fetch': SelectFetch,
});

AITSet({
  modal: Modal,
  'children-modal': ChildrenModal,
});