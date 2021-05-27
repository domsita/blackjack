import React from 'react';

const Status = ({ message, balance }) => {
    return (
        <div className='status-container'>
            <div className='status'>
                <h1 className='value'>{message}</h1>
            </div>
            <div className='balance-container'>
                <h1 className='balance'>${balance}</h1>
            </div>
        </div>
    )
}

export default Status;