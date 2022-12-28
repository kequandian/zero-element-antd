import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';
/**
 * 
 * @param { 按钮显示文字 } title
 * @param { 网站链接 } linkUrl
 * @param { 本地路由路径 } routePath
 * @param { 传参值匹配的字段 } query
 */

export default (props => {
  const {
    name,
    props: propsOtp,
    defaultValue,
    value,
    options,
    formdata,
    ...rest
  } = props;
  const {
    title,
    linkUrl = value,
    routePath,
    query = {
      id: 'id'
    }
  } = options; //替换括号内容

  function formatParams(url, data) {
    if (url && url.indexOf('(') !== -1) {
      let regex = /\((.*?)\)/g; //匹配(*) 小括号里面任意内容的正则

      let arr = url.match(regex); //字符串匹配出来的数组

      let formatString = url;
      arr.map(item => {
        const str = item.substring(1, item.length - 1);
        formatString = formatString.replace(`${item}`, data[str]);
      });
      return formatString;
    }

    return url;
  }

  const handleRouteAction = () => {
    if (!value) {
      return;
    }

    let path = '';

    if (routePath.indexOf('(') != -1) {
      path = formatParams(routePath, formdata);
    }

    history.push(path);
  };

  if (linkUrl) {
    return /*#__PURE__*/React.createElement(Button, {
      type: "link",
      href: formatParams(linkUrl, formdata),
      target: "_blank"
    }, title || value);
  } else if (routePath) {
    return value ? /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: handleRouteAction
    }, value || '-') : /*#__PURE__*/React.createElement("div", null, "-");
  } else {
    return "未设置linkUrl 或 routePath";
  }
});