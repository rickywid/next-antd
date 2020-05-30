import React from 'react';
import { NextPage } from 'next';
import { Input } from 'antd';
const { Search } = Input;

const SearchBar:NextPage = () => {
  return (
    <div>
        <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={value => console.log(value)}
        />
    </div>
  );
};

export default SearchBar;


