import { Avatar } from "antd";
import { get } from 'zero-element/lib/utils/request/endpoint';

export default function Avatars(props) { 
    const{
        value,
        options,
        handle,
        namespace
    }=props
    console.log(value);
    console.log(options);

    console.log(namespace);

    console.log(handle);

    const endpoint = get()

    console.log(endpoint);

    return <Avatar
    className="User_Avatar"
      style={{
        marginBottom:'50px',
        // backgroundColor:'#1890FF'
        width:100,
        height:100
      }}
      src={value?endpoint+value:null}/>
}