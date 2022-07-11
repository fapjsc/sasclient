import React, { useEffect } from 'react';
import ReactJson from 'react-json-view';

import {
  Card, Space, Divider, Button,
} from 'antd';
import useHttp from '../../hooks/useHttp';

// Apis
import { devGetEgmList, devGetPlayerList } from '../../lib/api-store';

const DevScreen = () => {
  const {
    sendRequest, data, status, error,
  } = useHttp(devGetEgmList);

  const {
    sendRequest: playerListReq,
    data: playerListData,
    error: playerListError,
    status: playerListStatus,
  } = useHttp(devGetPlayerList);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    playerListReq();
  }, [playerListReq]);

  useEffect(() => {
    if (error) {
      alert('fetch api ( /test/egmList ) 錯誤：', error);
    }
  }, [error]);

  useEffect(() => {
    if (playerListError) {
      alert(playerListError);
    }
  }, [playerListError]);

  const onEmgListClick = () => {
    sendRequest();
  };

  const onPlayerListClick = () => {
    playerListReq();
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
            <Button loading={status === 'pending'} onClick={onEmgListClick} style={{ marginBottom: '1rem' }} type="primary">更新</Button>
            {
              data && (
                <ReactJson
                  src={data}
                  name="egmList"
                  displayDataTypes={false}
                  theme="monokai"
                  collapsed={1}
                  // shouldCollapse={(field) => field.namespace.includes('egmList') && true}
                />
              )
            }
          </Space>
        </Card>

        <Card style={{ width: '550px' }}>
          <Space direction="vertical">
            <Button loading={playerListStatus === 'pending'} onClick={onPlayerListClick} style={{ marginBottom: '1rem' }} type="primary">更新</Button>
            {
              playerListData && (
                <ReactJson
                  name="memberList"
                  src={playerListData}
                  displayDataTypes={false}
                  theme="monokai"
                  collapsed={1}
                  // shouldCollapse={(field) => field.namespace.includes('memberList') && true}
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
