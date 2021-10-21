import React, { useState } from 'react';
import { Image, Modal } from 'antd';
import './index.css';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';

export default function ImageView(props) {
  const {
    value,
    max = 9,
    width = 60,
    height = 60,
    circle,
    border,
    background,
  } = props;
  const [visible, setVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const endpoint = getEndpoint()
  const list = format(value).slice(0, max - 1);

  function handleCancel() {
    setVisible(false);
  }
  function handlePreview(url) {
    setPreviewImage(url);
    setVisible(true);
  }
  const className = [
    'ZEleA-ImageView-container',
    circle ? 'circle' : '',
    border ? 'border' : '',
  ].join(' ');

  return <>
    {
      list.map((item, i) => {
        return <span
          className={className}
          key={i}
          style={{
            width,
            height,
            display: 'inline-block',
          }}
        >
          {background ? (
            <span
              onClick={handlePreview.bind(null, item.url)}
              className="bgConter"
              style={{
                backgroundImage: `url(${item.url})`,
              }}
            ></span>
          ) : (
              <Image
                src={item.url}
                width={width}
                height={height}
              />
            )}
        </span>
      })
    }
    <Modal
      visible={visible}
      footer={null}
      onCancel={handleCancel}
    >
      <img alt="image" style={{ width: '100%' }} src={previewImage} />
    </Modal>
  </>
}

function format(value) {
  let rst = [];
  const endpoint = getEndpoint()

  try {
    if (typeof (value) === 'string') {
      rst = JSON.parse(value);
    } else if (Array.isArray(value)) {
      rst = value;
    }
  } catch (e) {
    if(value.search("https")!=-1){
      rst.push({
        url: value,
      });
    }else{
      // console.log(value);
      rst.push({
        url: endpoint+value,
      });
    }
  }
  rst.length > 0 && rst.forEach((item, index) => {
    if(item.url){
      if(item.url.indexOf("https"||"http")===-1){
        rst[index] = {
          id: index,
          url: endpoint+item.url
        };
      }else{
      rst[index] = {
        id: index,
        url: item.url
      };
    }
  }}
  );
  return Array.isArray(rst) ? rst : [];
}