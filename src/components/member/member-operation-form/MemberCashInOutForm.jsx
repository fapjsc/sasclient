import React from 'react';
// import { message } from 'antd';
// eslint-disable-next-line
import ProForm, { DrawerForm } from '@ant-design/pro-form';
// import { PlusOutlined } from '@ant-design/icons';

// Components
import MachineList from '../../dashboard/gameMachine/MachineList';

// eslint-disable-next-line
const MemberCashInOutForm = ({ isShow, setShowForm, memberID }) => {

  return (
    <DrawerForm
      visible={isShow}
      autoFocusFirstInput
      submitter={false}
      drawerProps={{
        destroyOnClose: true,
        onClose: () => {
          setShowForm({ isShow: false, type: '' });
        },
      }}

    >
      <MachineList memberID={memberID} />
    </DrawerForm>
  );
};

export default MemberCashInOutForm;
