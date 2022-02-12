import React from 'react';
import MemberCard from './MemberCard';

// import { Space } from 'antd';

// eslint-disable-next-line
const AddMemberStep3 = ({ stepData }) => {
  const { picture, name } = stepData || {};
  return (
    <div
      style={{
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MemberCard picture={picture} name={name} />
    </div>
  );
};

export default AddMemberStep3;
