import React from 'react';
import { Link } from 'react-router-dom';

const DashboardAction = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-company' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit Company
      </Link>
    </div>
  );
};
export default DashboardAction;
