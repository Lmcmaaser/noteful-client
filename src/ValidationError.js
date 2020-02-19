import React from 'react';
import PropTypes from 'prop-types';

export default function ValidationError(props) {
  if(props.message) {
    console.log(props.message);
    return (
      <div className="error">{props.message}</div>
    );
  }
  return <></>
}

ValidationError.propTypes = {
  value: PropTypes.string
}
