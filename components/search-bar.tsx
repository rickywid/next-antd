import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { Input } from 'antd';
const { Search } = Input;

const SearchBar:NextPage = () => {
  useEffect(() => {
    console.log('searchbar mounted');
    
  });

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


