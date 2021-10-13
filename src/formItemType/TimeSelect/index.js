import React,{useState} from 'react';
import { Radio,DatePicker } from 'antd';
import selectTime from './selectTime';
import moment from 'moment'
const {RangePicker} = DatePicker
export default ({ props, onChange, ...rest }) => {
  const {
    value
  }=props
  function momentDate(date){
    return moment(new Date(date),"YYYY-MM-DD")
  }
  const [theValue,setValue] = useState(momentDate(value))
  function handleChange(e) {
    console.log(e.target.value)
    let newValue = momentDate(e.target.value)
    let newValueGroup
    if(e.target.value.indexOf("~")!==-1){
      newValueGroup = e.target.value.split("~")
      newValueGroup.map((item,i)=>{
        newValueGroup[i] = momentDate(item)
      })
      newValue = newValueGroup
    }
    console.log(newValue)
    setValue(newValue)
    onChange(e.target.value)
  }

  function PickerChange(e){
    let newValue = e
    console.log(e)
    setValue(newValue)
    console.log(theValue)
    if(Array.isArray(newValue)){
      onChange(moment(newValue[0]).format("YYYY/MM/DD")+"~"+moment(newValue[1]).format("YYYY/MM/DD"))
    }else{
      onChange(moment(newValue).format("YYYY/MM/DD"))
    }
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
      <Radio.Button value={"1970/01/01"}>自定义时间</Radio.Button>
      <Radio.Button value={"1970/01/01~2999/12/31"}>自定义时间范围</Radio.Button>
  </Radio.Group>
  {Array.isArray(theValue)?<RangePicker key={theValue+"Range"} defaultValue={theValue} onChange={val=>PickerChange(val)}></RangePicker>
  :<DatePicker key={theValue+"Date"} defaultValue={theValue} onChange={val=>PickerChange(val)}></DatePicker>
  }

  </>
}