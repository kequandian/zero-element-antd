import React, { useState } from 'react';
import { Card, Modal } from 'antd';

export default function ValueTypeImage(props) {
  const { options = {}, data: { text = '' } } = props;
  const { max = 9, width = 60, height = 60 } = options;
  const [visible, setVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const list = format(text).slice(0, max - 1);

  function handleCancel() {
    setVisible(false);
  }
  function handlePreview(url) {
    setPreviewImage(url);
    setVisible(true);
  }

  return <>
    {
      list.map((item, i) => {
        return <Card
          key={i}
          hoverable
          style={{
            width,
            height,
          }}
          onClick={handlePreview.bind(null, item.url)}
          bodyStyle={{
            padding: 0,
          }}
          cover={<img alt={item.name} src={item.url} />}
        >
        </Card>
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
  try {
    if (typeof (value) === 'string') {
      rst = JSON.parse(value);
    } else if (Array.isArray(value)) {
      rst = value;
    }
  } catch (e) {
    rst.push({
      url: value,
    });
  }
  rst.length > 0 && rst.map((item, index) => {
    rst[index] = {
      id: index,
      url: item.url,
    }
  });
  return Array.isArray(rst) ? rst : [];
}