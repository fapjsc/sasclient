import React, { useCallback, useState } from 'react';

// Antd
import {} from 'antd';

// Components
import MemberInfo from './MemberInfo';
import OperationNav from './OperationNav';

// eslint-disable-next-line
import MemberCashInOutForm from '../member-operation-form/MemberCashInOutForm';
// eslint-disable-next-line
import CashInAndOut from '../../dashboard/cashInAndOut/CashInAndOut';

// eslint-disable-next-line
const MemberOperation = ({memberData}) => {
  const [showForm, setShowForm] = useState({
    isShow: false,
    type: '',
  });
  const navClickHandler = useCallback((type) => {
    console.log(type);
    setShowForm({ isShow: true, type });
  }, []);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <MemberInfo memberData={memberData} />
        <OperationNav navClickHandler={navClickHandler} />
      </div>

      <MemberCashInOutForm
        setShowForm={setShowForm}
        isShow={showForm.isShow && showForm.type === 'cash-in-out'}
      />
      {/* <CashInAndOut
        visible={showForm.isShow && showForm.type === 'cash-in-out'}
        setVisible={setShowForm}
      /> */}
    </>
  );
};

export default MemberOperation;
