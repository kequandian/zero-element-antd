import React from 'react';
import { Button } from 'antd';
import { history, withRouter } from 'umi';

function ActionOnPath(props) {
  const { value,title, options, className, location } = props;
  const { isValue,query = {} } = options;

  console.log(value);
  function handleClick() {
    let data = {};
    if(isValue){
      data = {
        id:value
      }
    }else{
    Object.keys(query).forEach(toKey => {
      const formKey = query[toKey];
      data[toKey] = location.query[formKey] || formKey;
    });
  }
  // console.log(data)
    history.push({
      pathname: options.path,
      query: data,
    });
  }

  return <>
    <Button onClick={handleClick} className={className}>
      {title}
    </Button>
  </>
}

export default withRouter(ActionOnPath);