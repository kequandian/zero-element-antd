import config from "./status.config";
export default function valueTypeStatus(props) {
  const {
    options = {},
    data: {
      text = ''
    }
  } = props;
  const {
    map = {}
  } = options;
  return map[text] || config[text] || text;
}