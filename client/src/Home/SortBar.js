import React from 'react';

export const SortBar = (props) => {
    const {handleSort, sortby} = props;
    const handleSortby = event => {
        handleSort(event.target.value);
    }

    return (
        <div className="sortbar">
            <span className="sortbartext">
                <select className="sortselect" onChange={handleSortby} value={sortby}>
                    <option value="">Sort By ...</option>
                    <option value="rating">Rating</option>
                </select>
            </span>
        </div>
    );
};