import React, { Component } from 'react';
import SRadio from './SRadio';

const { Item } = SRadio;

export default function Radio({ config }) {
  const { options = {} } = config;
  const { base = {}, style = {}, items = [] } = options;
  const { value = {} } = base;

  return <SRadio value={value.value}>
    {items.map((item, i) => {
      return <Item key={i} value={item.value}>
        {item.label}
      </Item>
    })}
  </SRadio>
}