import { Popover } from 'antd'
const Svg = <svg t="1622104294626" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2370" width="16" height="16"><path d="M0 512c0 283.3152 228.6848 512 512 512s512-228.6848 512-512S795.3152 0 512 0 0 228.6848 0 512z" fill="#AAAAAA" p-id="2371"></path><path d="M563.2 768a51.2 51.2 0 1 1-102.4 0 51.2 51.2 0 0 1 102.4 0M512 665.6c-20.7616 0-37.8368-16.8192-38.6048-38.0416l-12.544-342.784C459.7248 255.0528 482.944 230.4 512 230.4s52.2496 24.6784 51.1744 54.3488l-12.544 342.784C549.8368 648.8064 532.7616 665.6 512 665.6" fill="#FFFFFF" p-id="2372"></path><path d="M512 640c-20.7616 0-37.8368-15.8208-38.6048-35.8144l-12.544-322.6368C459.7248 253.6448 482.944 230.4 512 230.4s52.2496 23.2192 51.1744 51.1488l-12.544 322.6368C549.8368 624.1792 532.7616 640 512 640" fill="#FFFFFF" p-id="2373"></path></svg>
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
        {svg}                
    </Popover>
}