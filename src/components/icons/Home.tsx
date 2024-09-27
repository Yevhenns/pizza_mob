import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const Home = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 32 32" width={40} height={40}>
      <Path
        d="M16 2.594l-.72.687-13 13 1.44 1.44L5 16.437V28h9V18h4v10h9V16.437l1.28 1.282 1.44-1.44-13-13-.72-.686zm0 2.844l9 9V26h-5V16h-8v10H7V14.437l9-9z"
        fill={props.color}
      />
    </Svg>
  );
};
