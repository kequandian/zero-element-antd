import { message as msg } from 'antd';
export default function onTips(props) {
  const {
    options,
    record
  } = props;
  const {
    message = '当前不可用'
  } = options;
  msg.warn(message);
}