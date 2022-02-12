import React, { useRef, useCallback, useState } from 'react';

import Webcam from 'react-webcam';

// Antd
import {
  Button, Space, Spin, message,
} from 'antd';

// eslint-disable-next-line
const AddMemberStep2 = ({ setStepData}) => {

  const webCamRef = useRef();

  const [mediaLoading, setMediaLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webCamRef.current.getScreenshot({
      width: 280,
      height: 320,
    });
    setImgSrc(imageSrc);
    setStepData((prev) => ({ ...prev, picture: imageSrc }));
  }, [setStepData, setImgSrc]);

  return (
    <div
      style={{
        padding: '3rem',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >

      {!imgSrc ? (
        <Space direction="vertical" style={{ position: 'relative' }}>
          {mediaLoading && <Spin size="large" style={{ position: 'absolute', top: '40%', right: '45%' }} />}
          <Webcam
            audio={false}
            ref={webCamRef}
            width={300}
            height={420}
            videoConstraints={{
              width: 300,
              height: 420,
              facingMode: 'user',
            }}
            screenshotFormat="image/jpeg"
            onUserMedia={() => setMediaLoading(false)}
            onUserMediaError={() => message.error('無法獲取攝影機')}
          />
          <Button
            shape="round"
            block
            size="large"
            type="primary"
            onClick={capture}
          >
            拍照
          </Button>
        </Space>
      ) : (
        <Space direction="vertical">
          <img
            style={{
              width: 300,
              height: 420,
            }}
            src={imgSrc}
            alt="member"
          />
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}
          >
            <Button
              block
              shape="round"
              size="large"
              type="primary"
              danger
              onClick={() => setImgSrc(null)}
            >
              重拍
            </Button>

          </div>
        </Space>
      )}
    </div>
  );
};

export default AddMemberStep2;
