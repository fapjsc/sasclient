import React from 'react';
import { Modal, Result, Button } from 'antd';
import PropTypes from 'prop-types';

const ModalConfirm = ({ visible, setVisible }) => {
  const okHandler = () => {
    console.log('ok');
  };

  const cancelHandler = () => {
    console.log('cancel');
    setVisible(false);
  };
  return (
    <Modal
      centered
      visible={visible}
      footer={null}
      onCancel={cancelHandler}
    >
      <Result
        title="確認交班嗎？"
        extra={[
          <Button type="primary" key="confirm" onClick={okHandler}>
            確認交班
          </Button>,
          <Button key="cancel" onClick={cancelHandler}>
            取消交班
          </Button>,
        ]}
      />
    </Modal>
  );
};

ModalConfirm.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default ModalConfirm;
