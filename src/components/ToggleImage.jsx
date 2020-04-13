import React from 'react';
import classnames from 'classnames';
import X from '../images/inline/x.svg';

export default function ToggleImage(props) {
  const { checked, onChange, Svg, label } = props;

  return (
    <div
      role="switch"
      aria-checked={checked}
      className={classnames('toggle image', { checked })}
      onClick={() => onChange && onChange(!checked)}
    >
      {label && <label>{label}</label>}
      {Svg && <Svg />}
      {!checked && <X style={{ position: 'absolute' }} />}
    </div>
  );
}
