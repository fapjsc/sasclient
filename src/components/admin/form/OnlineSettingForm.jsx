import React, { useRef } from 'react';
// eslint-disable-next-line
import { message } from 'antd';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';

// Apis
// eslint-disable-next-line
import { onlineSetting } from '../../../lib/api-store';

// Components
import ButtonEditForm from './ButtonEditForm';

// Config
import { STREAM_SERVER_EXTERNAL } from '../../../config/config';

// const waitTime = (time = 100) => new Promise((resolve) => {
//   setTimeout(() => {
//     resolve(true);
//   }, time);
// });

// eslint-disable-next-line
const OnlineSettingForm = ({ visible, setVisible, currentID, currentStreamID, buttons, onDone}) => {
  const buttonRef = useRef();

  // eslint-disable-next-line
  const subBtnList = buttons?.filter((el) => el.button_name !== 'max' && el.button_name !== 'take-win')

  const onFinish = async (values) => {
    const { serverIP, app, streamID } = values;

    const streamUrl = `webrtc://${serverIP}/${app}/${streamID}`;

    const data = {
      buttons: buttonRef.current?.buttons,
      streamUrl,
      id: currentID,
    };

    // console.log(data);

    const result = await onlineSetting(data);

    if (result.status === 200) {
      message.success('設定成功');
    } else {
      message.error('設定失敗');
    }

    setVisible(false);

    return true;
  };

  const getOnlineBtnData = (data) => {
    buttonRef.current = data;
    // console.log(data);
  };

  return (
    <ModalForm
      title="Online設定"
      visible={visible}
      autoFocusFirstInput
      initialValues={{
        app: 'game',
        serverIP: STREAM_SERVER_EXTERNAL,
        streamID: currentStreamID,
      }}
      modalProps={{
        onCancel: () => {
          setVisible(false);
        },
        afterClose: () => {
          onDone();
        },
        destroyOnClose: true,
      }}
      onFinish={onFinish}
    >
      <ProForm.Group>
        <ProFormText width="sm" name="app" label="視訊APP" />
        <ProFormText width="sm" name="serverIP" label="Server IP" />
        <ProFormText width="sm" name="streamID" label="Stream ID" />
      </ProForm.Group>
      <ButtonEditForm getOnlineData={getOnlineBtnData} subBtnList={subBtnList} />
    </ModalForm>
  );
};

export default OnlineSettingForm;
