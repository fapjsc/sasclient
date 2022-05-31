import React from 'react';
import ReactSearchBox from 'react-search-box';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterText } from '../../store/actions/showLiveActions';

const SearchBar = () => {
  const { egmStatus } = useSelector((state) => state.showLive);
  const dispatch = useDispatch();
  const data = egmStatus.map((el) => ({
    key: el.member.member_account,
    value: el.member.member_account,
  }));

  const onChangeHandler = (value) => {
    dispatch(setFilterText(value));
  };

  return (
    <ReactSearchBox
      placeholder="Search..."
      data={data}
      onSelect={(record) => console.log(record)}
      onFocus={() => {
        console.log('This function is called when is focussed');
      }}
      onChange={onChangeHandler}
      //   autoFocus
      leftIcon={<SearchOutlined />}
      iconBoxSize="48px"
    />
  );
};

export default SearchBar;
