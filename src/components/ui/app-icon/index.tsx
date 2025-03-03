import * as React from 'react';
import { forwardRef } from 'react';
import Svg, { Mask, Path, type SvgProps } from 'react-native-svg';

export const AppIcon = forwardRef<Svg, SvgProps>((props, ref) => (
  <Svg fill="none" width={47} height={50} ref={ref} {...props}>
    <Mask id="a" fill="#fff">
      <Path d="M40 42a8 8 0 0 1-8 8H10V34h22a8 8 0 0 1 8 8Z" />
    </Mask>
    <Path
      fill="#14FB00"
      d="M43 42c0 6.075-4.925 11-11 11H10v-6h22a5 5 0 0 0 5-5h6ZM10 31h22c6.075 0 11 4.925 11 11h-6a5 5 0 0 0-5-5H10v-6Zm22 0c6.075 0 11 4.925 11 11s-4.925 11-11 11v-6a5 5 0 0 0 0-10v-6ZM10 50V34v16Z"
      mask="url(#a)"
    />
    <Path
      stroke="#8E8E8E"
      strokeWidth={0.2}
      d="M16 38.9h16M18 41.9h16M16 44.9h16"
    />
    <Mask id="b" fill="#fff">
      <Path d="M40 29a8 8 0 0 1-8 8H10V21h22a8 8 0 0 1 8 8Z" />
    </Mask>
    <Path
      fill="#FF00E6"
      d="M43 29c0 6.075-4.925 11-11 11H10v-6h22a5 5 0 0 0 5-5h6ZM10 18h22c6.075 0 11 4.925 11 11h-6a5 5 0 0 0-5-5H10v-6Zm22 0c6.075 0 11 4.925 11 11s-4.925 11-11 11v-6a5 5 0 0 0 0-10v-6ZM10 37V21v16Z"
      mask="url(#b)"
    />
    <Path
      stroke="#8E8E8E"
      strokeWidth={0.2}
      d="M17 25.9h16M19 28.9h16M17 31.9h16"
    />
    <Path stroke="#FF6B00" d="m.646 28.646 23-23M46.646 29.354l-23-23" />
    <Path
      fill="#D9D9D9"
      fillRule="evenodd"
      d="M40 0h-.8v2h.8V0Zm-3.8 0H39v2h-2.8V0ZM38 2.2V4h-2.8V2.2H38ZM35 4h-2V2.2h2V4Zm-2 .2V6h1V4.2h-1ZM33 8V6.2h2V8h-2Zm0 .2V10h3V8.2h-3Zm0 3.8v-1.8h1V12h-1Zm0 .2V14h3v-1.8h-3Zm0 2.8v-.8h1V16l-1-1Zm1 1 .206.2H36V18l-2-2Zm4 2h-1.8v-1.8H39V18h-1Zm2 0h-.8v-1.8h.8V18Zm-1.8.2H40V20h-1.8v-1.8ZM38 20v-1.8h-1.8L38 20Zm2 .2h-1.8L40 22v-1.8ZM34.2 16H37v-1.8h-2.8V16Zm3 0H40v-1.8h-2.8V16Zm0-2h-1v-1.8H39V14h-1.8Zm2.8 0h-.8v-1.8h.8V14Zm-.8-2h.8v-1.8h-2.8V12h2ZM37 12v-1.8h-2.8V12H37Zm3-3.8V10h-.8V8.2h.8Zm-1 0V10h-2.8V8.2H39Zm1-.2V6.2h-1.8V8H40Zm-2 0V6.2h-2.8V8H38Zm2-3.8V6h-2.8V4.2H40Zm-3 0V6h-2.8V4.2H37Zm3-.2V2.2h-1.8V4H40Zm-7-4h3v2h-3V0Z"
      clipRule="evenodd"
    />
  </Svg>
));

AppIcon.displayName = 'AppIcon';
