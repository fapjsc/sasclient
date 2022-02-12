import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// Toast
import { toast } from 'react-toastify';

// Hooks
import useHttp from '../../../hooks/useHttp';

// Actions
// eslint-disable-next-line
import { setMemberData } from '../../../store/actions/memberActions';

// Apis
import { memberAuth } from '../../../lib/api-store';

// Components
import MemberLoginForm from './MemberLoginForm';
import MemberOperation from './MemberOperation';

export default () => {
  const { memberData, showInfo } = useSelector((state) => state.member);

  // Redux
  const dispatch = useDispatch();

  // Http Hooks
  const {
    sendRequest: memberLoginReq,
    error: memberLoginError,
    data: getMemberData,
    status: memberLoginStatus,
  } = useHttp(memberAuth);

  useEffect(() => {
    if (memberLoginError) {
      toast.error(memberLoginError);
      return;
    }

    if (
      getMemberData
      && memberLoginStatus === 'completed'
      && !memberLoginError
    ) {
      // setShowInfo(true);
      dispatch(setMemberData(getMemberData));
    }
  }, [getMemberData, memberLoginStatus, memberLoginError, dispatch]);

  return memberData && showInfo ? (
    <MemberOperation />
  ) : (
    <MemberLoginForm memberLoginReq={memberLoginReq} />
  );
};
