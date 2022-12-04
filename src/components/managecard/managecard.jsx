import React from 'react';

const ManageCard = ({customClass, children}) => {
    return (
        <div className={`manage-card ${customClass}`}>
            {children}
        </div>
    );
};

export default ManageCard;