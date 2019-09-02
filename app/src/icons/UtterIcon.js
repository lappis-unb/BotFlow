import React from "react";

const SvgUtterIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      d="M2 1C2 .3 3-.2 3.5.4l4 3.7H20a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V7zm16 13H6v2h12v-2zm0-3H6v2h12v-2zm0-3H6v2h12V8z"
      fill="props.fill"
      fillRule="evenodd"
    />
  </svg>
);

export default SvgUtterIcon;