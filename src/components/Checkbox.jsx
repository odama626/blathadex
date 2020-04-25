import React from 'react';
import Checkmark from 'images/inline/checkboxChecked.svg';
import classnames from 'classnames';

export default function Checkbox(props) {
  const { checked, onChange, label } = props;

  return (
    <div
      role='checkbox'
      aria-checked={checked}
      className={classnames('checkbox', { checked })}
      onClick={() => onChange && onChange(!checked)}
    >
      <div className='checkmark box'>{checked && <Checkmark />}</div>

      {label && <label>{label}</label>}
    </div>
  );
}
