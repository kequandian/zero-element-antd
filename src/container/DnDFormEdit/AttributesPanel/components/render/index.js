import React from 'react';
import LabelInput from './LabelComponents/LabelInput';
import LabelRadio from './LabelComponents/LabelRadio';
import SelectSQL from './LabelComponents/SelectSQL';

const labelSet = {
  'input': LabelInput,
  'radio': LabelRadio,
  'selectSQL': SelectSQL,
  'undefined': LabelInput,
};

export function renderStyleOptions(opt, handle) {
  return Object.keys(opt).map(key => {
    const { type } = opt[key];
    const Match = labelSet[type];
    return <Match key={key} field={key} handle={handle} {...opt[key]} />
  });
}

export function renderBaseOptions(opt, handle) {
  return Object.keys(opt).map(key => {
    const { type } = opt[key];
    const Match = labelSet[type];
    return <Match key={key} field={key} handle={handle} {...opt[key]} />
  });
}

export function renderAdvancedOptions(opt, handle) {
  return Object.keys(opt).map(key => {
    const { type } = opt[key];
    const Match = labelSet[type];
    return <Match key={key} field={key} handle={handle} {...opt[key]} />
  });
}