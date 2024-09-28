import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const User = (props: SvgProps) => {
  return (
    <Svg stroke-width="0" viewBox="0 0 24 24" id="user" width={40} height={40}>
      <Path
        d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
        fill={props.color}
      />
    </Svg>
  );
};
