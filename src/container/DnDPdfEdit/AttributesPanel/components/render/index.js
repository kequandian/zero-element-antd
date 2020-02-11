import React from 'react';
import LabelInput from './LabelComponents/LabelInput';
import LabelRadio from './LabelComponents/LabelRadio';
import SelectSQL from './LabelComponents/SelectSQL';
import SelectTable from './LabelComponents/SelectTable';
import SelectTableField from './LabelComponents/SelectTableField';
import TableField from './LabelComponents/TableField';
import SaveData from './LabelComponents/SaveData';


const labelSet = {
  'input': LabelInput,
  'radio': LabelRadio,
  'selectSQL': SelectSQL,
  'selectTable': SelectTable,
  'selectTableField': SelectTableField,
  'tableField': TableField,
  'saveData': SaveData,
  'undefined': LabelInput,
};

export function renderStyleOptions(opt, handle) {
  return Object.keys(opt).map(key => {
    const { type } = opt[key];
    const Match = labelSet[type];
    return <Match key={key} field={key} handle={handle} {...opt[key]} />;
  });
}

export function renderBaseOptions(opt, handle) {
  return Object.keys(opt).map(key => {
    const { type } = opt[key];
    const Match = labelSet[type];
    return <Match key={key} field={key} handle={handle} {...opt[key]} />;
  });
}

export function renderAdvancedOptions(opt, options, handle, props) {
  return Object.keys(opt).map(key => {
    const { type } = opt[key];
    const Match = labelSet[type];
    return <Match key={key} field={key} handle={handle} {...opt[key]}
      options={options}
      config={opt}
      {...props}
    />;
  });
}