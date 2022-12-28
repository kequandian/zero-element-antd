import React from 'react';

export default (props) => {
  const {
    name,
    props: propsOtp,
    defaultValue,
    value,
    ...rest
  } = props;

  return <div dangerouslySetInnerHTML={{ __html: value }}>
</div>;
}