/* Created by ThanhDat Nguyen (tnrbf@umsystem.edu) on 2024-11-07*/

/* Last updated by ThanhDat Nguyen (tnrbf@umsystem.edu) on on 2024-11-07*/

import React from 'react';
import './SearchBox.css';
import PropTypes from 'prop-types';

const SearchBox = ({ onSearch }) => {
    return (
        <div className="search-box-container">
            <input 
                type="text" 
                placeholder="Search Table..." 
                onChange={(e) => onSearch(e.target.value)} 
                className="search-box-input" 
            /> 
        </div>
    );
};

SearchBox.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBox;
