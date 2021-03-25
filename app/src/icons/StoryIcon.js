import React from 'react';

const SvgStoryIcon = (props) => (
  <svg width={24} height={24} {...props}>
    <path
      d="M19 7h2.4c.8 0 1.5.6 1.6 1.5v13.7c0 .6-.7 1-1.2.7v-.1l-3.1-3H8.6c-.8 0-1.5-.6-1.6-1.5V17h12V7h2.4zM1 1.8c0-.7.7-1 1.2-.6l3.1 3h10.1c.9 0 1.6.7 1.6 1.6v7.6c0 .9-.7 1.6-1.6 1.6H2.6c-.9 0-1.6-.7-1.6-1.6V6.6z"
      fill="props.fill"
      fillRule="evenodd"
    />
  </svg>
);

export default SvgStoryIcon;
