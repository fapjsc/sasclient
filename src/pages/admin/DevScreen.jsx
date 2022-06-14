import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view';

import {
  Card, Space, Divider, Button,
} from 'antd';
import useHttp from '../../hooks/useHttp';

// Apis
import { devGetEgmList } from '../../lib/api-store';

const DevScreen = () => {
  const [jsonData, setJsonData] = useState('');

  const {
    sendRequest, data, status, error,
  } = useHttp(devGetEgmList);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (data) {
      setJsonData(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert('fetch api ( /test/egmList ) 錯誤：', error);
    }
  }, [error]);

  const onClick = () => {
    sendRequest();
  };

  return (
    <>
      <Space direction="vertical">
        <div>
          <a
            href={process.env.REACT_APP_SRS_WEB}
            target="_blank"
            rel="noreferrer"
          >
            視訊 Server
          </a>
        </div>
        <Divider />
        <Card style={{ width: '550px' }}>
          <Space direction="vertical">
            <Button loading={status === 'pending'} onClick={onClick} style={{ marginBottom: '1rem' }} type="primary">更新</Button>
            {
              jsonData && (
                <ReactJson
                  src={jsonData}
                  displayDataTypes={false}
                  theme="monokai"
                  shouldCollapse={(field) => field.namespace.includes('root') && true}
                />
              )
            }
          </Space>
        </Card>
      </Space>

    </>

  );
};

export default DevScreen;
