import React from 'react';

export const Rating = ({rating, totalratings}) => {

    const rating_percentage = rating * 20 + "%";

    return (
        <div className="ratings-container">
            <div className="star-ratings-sprite">
                <span style={{width: rating_percentage}} className="star-ratings-sprite-rating"></span> 
            </div>
            <div className="rating-description">
                <span className="rating-text">(Average {rating} from {totalratings} ratings)</span>
            </div>
        </div>
    );
}