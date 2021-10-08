function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef, useState } from 'react';
import { Input, Tag } from 'antd';
import Toptips from "./Toptips";
export default (({
  props,
  svg,
  placement,
  trigger,
  toptips,
  width = "240px",
  ...rest
}) => {
  const InputRef = useRef();
  let Taglist = [];
  const [NewTag, setNewTag] = useState();

  function handleChange() {
    let textVal;
    console.log(rest);
    Taglist = [];
    textVal = InputRef.current.state.value;

    if (textVal === undefined || textVal === null) {
      console.log(InputRef);
      console.log(textVal);
    } else {
      let MoneyVal = textVal.replace(/D/g, "金钱");
      let PerVal = MoneyVal.replace(/\P/g, "百分比");
      let TimeVal = PerVal.replace(/\T/g, "时间");
      let NumVal = TimeVal.replace(/\C/g, "数量");
      let StringVal = NumVal.replace(/S/g, "字符串");
      let string = StringVal.split(/\,/g);
      Taglist.push(string);
      setNewTag(Taglist[0]);
      console.log(NewTag);
      console.log(Taglist[0]);
      return Taglist, NewTag;
    }
  }

  console.log(Taglist);
  return toptips ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, _extends({}, props, rest, {
    style: {
      width: width
    },
    ref: InputRef,
    onChange: handleChange
  })), /*#__PURE__*/React.createElement(Toptips, {
    content: toptips,
    svg: svg,
    placement: placement,
    trigger: trigger
  }), /*#__PURE__*/React.createElement("div", {
    className: "TagList",
    style: {
      width: '100%'
    }
  }, NewTag ? NewTag.map((text, i) => /*#__PURE__*/React.createElement(Tag, {
    color: "#108ee9"
  }, NewTag[i])) : null)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, _extends({}, props, rest, {
    style: {
      width: width
    },
    ref: InputRef,
    onChange: handleChange
  })));
});