import { set as LayoutSet } from 'zero-element-global/lib/layout';
import { set as CSet } from 'zero-element-global/lib/container';
import { set as LASet } from 'zero-element-global/lib/listAction';
import { set as FITSet } from 'zero-element-global/lib/formItemType';
import { set as AITSet } from 'zero-element-global/lib/actionItemType';

import Grid from '@/layout/Grid';
import Content from '@/layout/Content';

import BaseList from '@/container/List/BaseList';
import BaseSearch from '@/container/Form/BaseSearch';
import BaseForm from '@/container/Form/BaseForm';
import DnDFormEdit from '@/container/DnDFormEdit';

import onModal from '@/listAction/onModal';

import Input from '@/formItemType/Input';
import Modal from '@/actionItemType/Modal';

LayoutSet({
  'Empty': ({ children }) => children,
  Grid,
  Content,
});

CSet({
  BaseList,
  BaseSearch,
  BaseForm,
  DnDFormEdit,
});

LASet({
  onModal,
});

FITSet({
  input: Input,
});

AITSet({
  modal: Modal,
});