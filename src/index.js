import { set as LayoutSet } from 'zero-element-global/lib/layout';
import { set as CSet } from 'zero-element-global/lib/container';
import { set as LASet } from 'zero-element-global/lib/listAction';
import { set as FITSet } from 'zero-element-global/lib/formItenType';

import Grid from '@/layout/Grid';

import BaseList from '@/container/List/BaseList';
import BaseSearch from '@/container/Form/BaseSearch';
import BaseForm from '@/container/Form/BaseForm';
import DnDFormEdit from '@/container/DnDFormEdit';

import onModal from '@/listAction/onModal';

import Input from '@/formItemType/Input';

LayoutSet({
  'Empty': ({ children }) => children,
  Grid,
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