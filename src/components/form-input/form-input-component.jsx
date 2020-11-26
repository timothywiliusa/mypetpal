import React, { Component } from 'react';

import './form-input.styles.scss';

const formInput = ({ handleChange, label, ...otherProps }) => (
	<div className="group">
		<input className="form-input" onChange={hangleChange} {...otherProps} />
		{label ? (
			<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
		) : null}
	</div>
);
