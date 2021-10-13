import React from 'react';
import { Radio } from 'antd';
import selectTime from './selectTime';
export default ({ props, onChange, ...rest }) => {
  function handleChange(e) {
    console.log(e.target.value)
    onChange(e.target.value);
  }


  return <><Radio.Group
    {...rest}
    {...props}
    onChange={handleChange}
    buttonStyle="solid"
  >
      <Radio.Button value={selectTime("Today")}>今日</Radio.Button>
      <Radio.Button value={selectTime("Week")}>本周</Radio.Button>
      <Radio.Button value={selectTime("Month")}>本月</Radio.Button>
      <Radio.Button value={selectTime("Quarter")}>本季度</Radio.Button>
      <Radio.Button value={selectTime("Year")}>今年</Radio.Button>
  </Radio.Group>
  </>
}