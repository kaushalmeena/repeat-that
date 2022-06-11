import PropTypes from "prop-types";
import React from "react";
import Svg, { Path } from "react-native-svg";

function ReplayIcon({ fill, height, width }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      height={height}
      width={width}
    >
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    </Svg>
  );
}

ReplayIcon.propTypes = {
  fill: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired
};

export default ReplayIcon;
