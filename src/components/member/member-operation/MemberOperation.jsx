import React, { useCallback, useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';

// Antd
import { message } from 'antd';

// Hooks
import useHttp from '../../../hooks/useHttp';

// Apis
import { getMember } from '../../../lib/api-store';

// Components
import MemberInfo from './MemberInfo';
import MemberCardInfo from './MemberCardInfo';
import OperationNav from './OperationNav';

import MemberCashInOutForm from '../member-operation-form/MemberCashInOutForm';
import DepositAndWithdrawalForm from '../member-operation-form/DepositAndWithdrawalForm';
import MemberUpdateForm from '../member-operation-form/MemberUpdateForm';

const initialStat = {
  isShow: false,
  type: '',
};

const MemberOperation = () => {
  const {
    data: getMemberData,
    error: getMemberDataError,
    sendRequest: getMemberDataReq,
  } = useHttp(getMember);

  const { currentCard, memberData } = useSelector((state) => state.member);
  const { member_account: account } = memberData || {};

  const [showForm, setShowForm] = useState(initialStat);
  const navClickHandler = useCallback(
    (type) => {
      if (!currentCard) {
        toast.error('請先選擇卡號');
        return;
      }
      setShowForm({ isShow: true, type });
    },
    [currentCard],
  );

  const getMemberHandler = () => {
    getMemberDataReq({ type: 'account', value: account });
  };

  useEffect(() => {
    if (getMemberDataError) {
      message.error('Get member data error');
    }

    if (!getMemberDataError && getMemberData) {
      setShowForm(initialStat);
    }
  }, [getMemberDataError, getMemberData]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <MemberInfo memberData={memberData} setShowForm={setShowForm} />
        {currentCard && <MemberCardInfo />}
        <OperationNav navClickHandler={navClickHandler} />
      </div>

      <MemberCashInOutForm
        setShowForm={setShowForm}
        isShow={showForm.isShow && showForm.type === 'cash-in-out'}
      />

      <DepositAndWithdrawalForm
        type="deposit"
        setShowForm={setShowForm}
        isShow={showForm.isShow && showForm.type === 'deposit'}
        currentCard={currentCard}
        getMemberHandler={getMemberHandler}
      />

      <DepositAndWithdrawalForm
        type="withdrawal"
        setShowForm={setShowForm}
        isShow={showForm.isShow && showForm.type === 'withdrawal'}
        currentCard={currentCard}
        getMemberHandler={getMemberHandler}
      />

      <MemberUpdateForm
        setShowForm={setShowForm}
        isShow={showForm.isShow && showForm.type === 'update-member'}
      />
    </>
  );
};

export default MemberOperation;
