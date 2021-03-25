import React from 'react';

const SvgIntentIcon = (props) => (
  <svg width={24} height={24} {...props}>
    <path
      d="M22 15V4a2 2 0 00-2-2H4a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12.6l3.9 3.7c.6.6 1.5.1 1.5-.8V15zM12 6c-1 0-1.7.2-2.2.5-.6.4-.8 1-.8 1.7h2c0-.3 0-.5.2-.6.2-.2.5-.3.7-.3.3 0 .6.1.8.3.2.2.3.4.3.7 0 .3-.1.5-.3.7a2 2 0 01-.6.6l-1 .8c-.3.3-.4.6-.4 1.1h2c0-.3 0-.5.2-.7 0-.2.2-.3.5-.5a3 3 0 001.1-.8c.3-.4.5-.8.5-1.2a2 2 0 00-.8-1.7c-.6-.4-1.3-.6-2.3-.6zm-1.3 6.5v2h2v-2h-2z"
      fill="props.fill"
      fillRule="evenodd"
    />
  </svg>
);

export default SvgIntentIcon;
