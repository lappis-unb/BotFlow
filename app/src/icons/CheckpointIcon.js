import React from "react";

const SvgCheckpointIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      d="M10 6l-1.41 1.41 4.58 4.59-4.58 4.59 1.41 1.41 6-6z"
      fill="props.fill"
      fillRule="evenodd"
    />
  </svg>
);

export default SvgCheckpointIcon;
