import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createCompany } from '../../actions/company';

const CreateCompany = ({ createCompany, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    type: '',
    country: '',
    description: '',
    nominated: '',
    assignedTo: ''
  });
  const {
    name,
    address,
    phone,
    email,
    type,
    country,
    description,
    nominated,
    assignedTo
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    createCompany(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create a Company</h1>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select name='type' value={type} onChange={e => onChange(e)}>
            <option value='0'>* Select Company Type</option>
            <option value='Bank'>Bank</option>
            <option value='Investment Bank'>Investment Bank</option>
            <option value='Stock Exchange'>Stock Exchange</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>Which type of business there are?</small>
        </div>
        <div className='form-group'>
          <select name='country' value={country} onChange={e => onChange(e)}>
            <option value='0'>* Select Country</option>
            <option value='Azerbadjan'>Azerbadjan</option>
            <option value='Nigeria'>Nigeria</option>
            <option value='Tchad'>Tchad</option>
            <option value='Ukraine'>Ukraine</option>
          </select>
          <small className='form-text'>Which country they are from</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Address'
            name='address'
            value={address}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            City & state suggested{' '}
            <strong>
              (eg. Quartier Beguinage Av Idriss Miskine B.P. Box 146 N'Djamena)
            </strong>
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Contact telephone'
            name='phone'
            value={phone}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Please use full telephone and extention{' '}
            <strong>(eg. +235-2000-9888 ext: 1234)</strong>
          </small>
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Contact email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Description'
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <div className='form-group'>
          <select
            name='nominated'
            value={nominated}
            onChange={e => onChange(e)}
          >
            <option value='0'>* Select Nominated</option>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
          <small className='form-text'>
            Give us an idea they have been nominated
          </small>
        </div>
        <div className='form-group'>
          <select
            name='assignedTo'
            value={assignedTo}
            onChange={e => onChange(e)}
          >
            <option value='0'>Assign to </option>
            <option value='Tanya'>Tanya</option>
            <option value='Sasha'>Sasha</option>
            <option value='Anna'>Anna</option>
            <option value='Uriy'>Uriy</option>
          </select>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' href='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateCompany.propTypes = {
  createCompany: PropTypes.func.isRequired
};

export default connect(null, {
  createCompany
})(withRouter(CreateCompany));
