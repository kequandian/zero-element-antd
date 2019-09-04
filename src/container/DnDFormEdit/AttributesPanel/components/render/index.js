import React from 'react';
import LabelInput from './LabelComponents/LabelInput';
import LabelRadio from './LabelComponents/LabelRadio';
import SelectSQL from './LabelComponents/SelectSQL';
import SelectTable from './LabelComponents/SelectTable';

const labelSet = {
  'input': LabelInput,
  'radio': LabelRadio,
  'selectSQL': SelectSQL,
  'selectTable': SelectTable,
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

export function renderAdvancedOptions(opt, options, handle) {
  return Object.keys(opt).map(key => {
    const { type } = opt[key];
    const Match = labelSet[type];
    return <Match key={key} field={key} handle={handle} {...opt[key]}
      options={options}
      config={opt}
    />;
  });
}