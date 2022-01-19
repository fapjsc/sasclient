import React, { useState } from 'react';

import PropTypes from 'prop-types';

// Antd
import { Modal } from 'antd';

// Redux
import { useDispatch } from 'react-redux';

// Actions
import { restEgmCashInOut } from '../../../store/actions/egmActions';

// Components
import CashForm from './CashForm';

const CashInAndOut = ({ visible, setVisible }) => {
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(0);

  const handleCancel = () => {
    setCurrent(0);
    dispatch(restEgmCashInOut());
    setVisible(false);
  };
  return (
    <Modal title="設定" visible={visible} onCancel={handleCancel} width={800} footer={null}>
      <CashForm
        setVisible={setVisible}
        // selectMachine={selectMachine}
        handleCancel={handleCancel}
        current={current}
        setCurrent={setCurrent}
      />
    </Modal>
  );
};

CashInAndOut.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  // selectMachine: PropTypes.func.isRequired,
};

export default CashInAndOut;
