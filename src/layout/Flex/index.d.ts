import * as React from 'react';
import FlexItem from './FlexItem';

export interface FlexProps {
  auto: true | false;
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  style?: React.CSSProperties;
  className?: String;
}

declare class Flex extends React.Component<FlexProps, any> {
  public static FlexItem: typeof FlexItem;
}

export default Flex