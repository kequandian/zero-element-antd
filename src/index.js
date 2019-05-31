import { set as LayoutSet } from 'zero-element-global/lib/layout';
import { set as CSet } from 'zero-element-global/lib/container';
import { set as LASet } from 'zero-element-global/lib/listAction';
import { set as FITSet } from 'zero-element-global/lib/formItenType';

import BaseList from '@/container/List/BaseList';
import BaseForm from '@/container/Form/BaseForm';
import DnDFormEdit from '@/container/DnDFormEdit';

import onModal from '@/listAction/onModal';

import Input from '@/formItemType/Input';

LayoutSet({
  'Empty': ({ children }) => children,
});

CSet({
  BaseList,
  BaseForm,
  DnDFormEdit,
});

LASet({
  onModal,
});

FITSet({
  input: Input,
});