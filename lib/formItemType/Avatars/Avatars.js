import { Avatar } from "antd";
import { get } from 'zero-element/lib/utils/request/endpoint';
import "./Avatars.less";
export default function Avatars(props) {
  const {
    value,
    options,
    handle,
    namespace
  } = props;
  console.log(value);
  console.log(options);
  console.log(namespace);
  console.log(handle);
  const endpoint = get();
  console.log(endpoint);
  return /*#__PURE__*/React.createElement(Avatar, {
    className: "User_Avatar",
    style: {
      width: 100,
      height: 100
    },
    src: value ? endpoint + value : null
  });
}