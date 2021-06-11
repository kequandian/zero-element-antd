import React, { useState, useEffect, useRef } from "react";
import './index.less';
import { PlaySvg, StopSvg,BackSvg } from './svg';
import Thumb  from '@/../zero-antd-dep/components/Thumb'
import { get as getEndPoint } from 'zero-element/lib/utils/request/endpoint';

export default function VideoPreview(props) {
    // const {
    //     // API,
    //     src,
    //     width = "100px",
    //     // height = "300px",
    //     value
    // } = props

    const { value,data: { text = '', record, index }, options = {}, width = "100px", } = props;
    const { path, query = { id: 'id' }, blank = false } = options;

    const Mock = document.getElementById(`Video_Mock_${index}`);
    const View = document.getElementById(`Video_View_${index}`);
    const VideoPlay = document.getElementById(`Video_Play_${index}`);
    const [controls, setControls] = useState(false);
    const [SvgSize, SetSvgSize] = useState("20");
    const [playing, SetPlaying] = useState(true);
    const [opacity, SetOpacity] = useState(false);

    const [videoUrl, setVideoUrl] = useState('');
    const [fileType, setFileType] = useState('');
    // console.log(text);
    useEffect(() => {

        let Url
        if (text.indexOf("url") === -1) {
            Url = text
        } else {
            Url = JSON.parse(text)[0].url;
        }

        const endpoint = getEndPoint();
        const path = endpoint + Url;

        let type = fileSet(path);
        setFileType(type);
        if (type) {
            setVideoUrl(path);
        } else {
            setVideoUrl('xxx.avi');
        }

    }, []);

    const handleClick = (url) => {
        View.classList.add("BigVideo");
        View.setAttribute('src', url);
        View.play();
        setControls(true);
        Mock.classList.add("view");
        VideoPlay.classList.add("VP_Big");
        SetSvgSize("40");
        SetPlaying(true);
        SetOpacity(true);
       console.log(opacity);
    }

    // const LeaveSvg = () => {
    //     SetOpacity("1");
    // }
    // const HoverSvg = () => {
    //     SetOpacity("0");
    // }

    const fileSet = (filename) => {
        if (!filename || typeof filename != 'string') {
            return false
        }
        let back = filename.split('').reverse().join('');
        let getname = back.substring(0, back.search(/\./)).split('').reverse().join('');
        let clearother = getname.split(/\?/)[0]
        return clearother
    };

    const hideClick = () => {
        View.classList.remove("BigVideo");
        View.pause();
        VideoPlay.classList.remove("VP_Big");
        Mock.classList.remove("view");
        setControls(false);
        SetSvgSize("20");
        SetPlaying(false);
        SetOpacity(false);
        console.log(opacity);
    }

    return <>{text ? <div className="Video_Container">
        <div id={`Video_Mock_${index}`} className="Video_Mock_css" onClick={hideClick}></div>
        {opacity?<a className="exit" onClick={hideClick}><BackSvg width={SvgSize} height={SvgSize}/></a>:null}
        {
            fileType === "mp4" ? (
                <div id={`Video_Play_${index}`} className="Video_Play_css" style={{ width: width }} onClick={() => handleClick(videoUrl)}/*  onMouseLeave={HoverSvg} onMouseEnter={LeaveSvg} */>

                    <video id={`Video_View_${index}`} className="Video_View_css" autoPlay={false} width={width}
                        src={videoUrl} />

                    {opacity?null:( playing ?<PlaySvg width={SvgSize} height={SvgSize} opacity={opacity} /> : <StopSvg width={SvgSize} height={SvgSize} opacity={opacity} />)}
                </div>
            ) : (
                <Thumb value={text}></Thumb>
                )
        }
    </div> : <Thumb value={text}></Thumb>}
    </>
}