import React,{useState,useEffect} from "react"
import './VideoView.less'
import {PlaySvg,StopSvg} from './svg'
import {get as getEndPoint } from 'zero-element/lib/utils/request/endpoint';

export default function Video(props){
    const{
        // API,
        src = "http://edge.ivideo.sina.com.cn/139420602.mp4?KID=sina,viask&Expires=1622304000&ssig=Rpl5SCDqCj&reqid=",
        width = "300px",
        height = "300px",
        value
    }=props

    const Mock = document.getElementById("Video_Mock")
    const View = document.getElementById("Video_View")
    const VideoPlay = document.getElementById("Video_Play")
    const Svg = document.getElementsByClassName("svg")[0]
    const [controls,setControls] = useState(false)
    const [SvgSize,SetSvgSize] = useState("32")
    const [playing,SetPlaying] = useState(true)
    const [Video,SetVideo] = useState()
    const [opacity,SetOpacity] = useState("1")


    const handleClick = () =>{
        View.classList.add("BigVideo");
        View.play();
        setControls(true)
        Mock.classList.add("view")
        VideoPlay.classList.add("VP_Big")
        SetSvgSize("80")
        SetPlaying(true)
        SetOpacity("0")
        return SvgSize,opacity
    } 

    const LeaveSvg=()=>{
        SetOpacity("1")
    }
    const HoverSvg=()=>{
        SetOpacity("0")
    }

    const fileSet=(filename)=>{
        if(!filename||typeof filename!='string'){
           return false
        };
        let back = filename.split('').reverse().join('');
        let getname = back.substring(0,back.search(/\./)).split('').reverse().join('');
        let clearother = getname.split(/\?/)[0]
        return clearother
      };
      let fileType = fileSet(value)

      


    const hideClick = () =>{
        View.classList.remove("BigVideo");
        View.pause();
        VideoPlay.classList.remove("VP_Big")
        Mock.classList.remove("view")
        setControls(false)
        SetSvgSize("32")
        SetPlaying(false)
        SetOpacity("1")
        return SvgSize,opacity
    }

    const endpoint = getEndPoint()
    const APISrc = endpoint+value

    return <div className="Video_Container">
        <div id="Video_Mock" onClick={hideClick}></div>
        <div id="Video_Play" onClick={handleClick} onMouseLeave={HoverSvg} onMouseEnter={LeaveSvg}>
        <video id="Video_View"  src={fileType==="mp4"||fileType==="avi"||fileType==="mov"?APISrc:src} autoPlay={false} width={width} height={height}></video>
        {playing?<PlaySvg width={SvgSize} height={SvgSize} opacity={opacity} />:<StopSvg width={SvgSize} height={SvgSize} opacity={opacity}/>}</div>
    </div>
}