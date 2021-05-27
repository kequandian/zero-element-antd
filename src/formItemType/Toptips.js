import { Popover } from 'antd'
import React from 'react'
const Svg = <svg t="1622112960669" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4030" width="24" height="24"><path d="M512 2C228.7 2 2 228.7 2 512s226.7 510 510 510 510-226.7 510-510S795.3 2 512 2z m0 742.3c-28.3 0-51-22.7-51-51s22.7-51 51-51 51 22.7 51 51c0 34-22.7 51-51 51zM597 495c-45.3 22.7-56.7 45.3-56.7 73.7v22.7h-68v-22.7c0-45.3 17-79.3 62.3-107.7 39.7-22.7 56.7-45.3 56.7-79.3s-28.3-62.3-73.7-62.3-73.7 28.3-79.3 68h-68c5.7-73.7 56.7-136 153-136 85 0 147.3 51 147.3 124.7-5.6 56.6-28.3 90.6-73.6 118.9z" p-id="4031" fill="#1296db"></path></svg>
export default function (props){
    const {
        title,
        content,
        svg=Svg,
        placement="top",
        trigger="click"
    }=props
    const TopTitle = (<h2>{title}</h2>)
    const Content = (<h3>{content}</h3>)
    return <Popover title={TopTitle} placement={placement} content={Content} trigger={trigger}>
        <span style={{marginLeft:"15px"}}>{svg}</span>                
    </Popover>
}