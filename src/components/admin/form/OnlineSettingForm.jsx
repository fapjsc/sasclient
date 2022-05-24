import React, { useRef } from 'react';

import PropTypes from 'prop-types';

// Antd
import { message, Divider } from 'antd';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';

// Apis
import { onlineSetting } from '../../../lib/api-store';

// Components
import ButtonEditForm from './ButtonEditForm';

// Config
import { STREAM_SERVER_EXTERNAL } from '../../../config/config';

const OnlineSettingForm = ({
  visible, setVisible, currentID, currentStreamID, buttons, onDone, brand,
}) => {
  const buttonRef = useRef();

  // eslint-disable-next-line
  const subBtnList = buttons?.filter((el) => el.button_name !== 'max' && el.button_name !== 'take-win' &&  el.button_name !== 'spin')

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
      width="80vw"
      onFinish={onFinish}
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
        maskClosable: false,

      }}
    >
      <Divider orientation="left">視訊</Divider>
      <ProForm.Group>
        <ProFormText width="sm" name="app" label="視訊APP" />
        <ProFormText width="sm" name="serverIP" label="Server IP" />
        <ProFormText width="sm" name="streamID" label="Stream ID" />
      </ProForm.Group>
      <ButtonEditForm getOnlineData={getOnlineBtnData} subBtnList={subBtnList} brand={brand} />
    </ModalForm>
  );
};

OnlineSettingForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  currentID: PropTypes.number,
  currentStreamID: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  onDone: PropTypes.func.isRequired,
  brand: PropTypes.string,
};

OnlineSettingForm.defaultProps = {
  buttons: [],
  brand: '',
  currentID: null,
  currentStreamID: '',
};

export default OnlineSettingForm;
