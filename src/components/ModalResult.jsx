import React from 'react';
import { Modal, Result, Button } from 'antd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const ModalResult = ({ isModalVisible = true }) => {
  const history = useHistory();

  const btn = (
    <Button type="primary" key="console" onClick={() => history.replace('/login')}>
      重新登入
    </Button>
  );
  return (
    <>
      <Modal visible={isModalVisible} closable={false} footer={false}>
        <Result status="warning" title="Token Invalid" extra={btn} />
      </Modal>
    </>
  );
};

ModalResult.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
};

export default ModalResult;
