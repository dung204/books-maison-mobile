import {
  type ElementRef,
  createContext,
  forwardRef,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  Animated,
  type StyleProp,
  StyleSheet,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native';

interface GridContextValue {
  gridInnerWidth?: number;
  gap: number;
  numColumns: number;
}

const GridContext = createContext<GridContextValue | null>(null);

interface GridProps extends ViewProps {
  numColumns?: number;
  style?: StyleProp<{
    [K in keyof ViewStyle]: Exclude<
      ViewStyle[K],
      Animated.AnimatedNode | 'auto'
    >;
  }>;
}

const Grid = forwardRef<ElementRef<typeof View>, GridProps>(
  ({ numColumns = 12, ...props }, ref) => {
    const [gridInnerWidth, setGridInnerWidth] = useState<number>();
    const [gridGap, setGridGap] = useState<number>();

    return (
      <GridContext.Provider
        value={{ gridInnerWidth, gap: gridGap || 0, numColumns }}
      >
        <View
          ref={ref}
          {...props}
          style={[
            {
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            },
            props.style,
          ]}
          onLayout={event => {
            const flattenedStyles = StyleSheet.flatten(props.style);
            const initialGridWidth = event.nativeEvent.layout.width;

            const paddingLeftToSubtract =
              flattenedStyles?.paddingStart ||
              flattenedStyles?.paddingLeft ||
              flattenedStyles?.paddingHorizontal ||
              flattenedStyles?.padding ||
              0;
            const calculatedPaddingLeft =
              typeof paddingLeftToSubtract === 'string'
                ? calculatePercentage(paddingLeftToSubtract, initialGridWidth)
                : paddingLeftToSubtract;

            const paddingRightToSubtract =
              flattenedStyles?.paddingEnd ||
              flattenedStyles?.paddingRight ||
              flattenedStyles?.paddingHorizontal ||
              flattenedStyles?.padding ||
              0;
            const calculatedPaddingRight =
              typeof paddingRightToSubtract === 'string'
                ? calculatePercentage(paddingRightToSubtract, initialGridWidth)
                : paddingRightToSubtract;

            const borderLeftWidth =
              flattenedStyles?.borderStartWidth ||
              flattenedStyles?.borderLeftWidth ||
              flattenedStyles?.borderWidth ||
              0;
            const borderRightWidth =
              flattenedStyles?.borderEndWidth ||
              flattenedStyles?.borderRightWidth ||
              flattenedStyles?.borderWidth ||
              0;
            const borderWidthToSubtract = borderLeftWidth + borderRightWidth;

            const gap = flattenedStyles?.rowGap || flattenedStyles?.gap || 0;
            const calculatedGap =
              typeof gap === 'string'
                ? gap.endsWith('%')
                  ? calculatePercentage(gap, initialGridWidth)
                  : parseFloat(gap)
                : gap;

            const gridWidth =
              initialGridWidth -
              calculatedPaddingLeft -
              calculatedPaddingRight -
              borderWidthToSubtract;

            setGridGap(calculatedGap);
            setGridInnerWidth(gridWidth);
          }}
        />
      </GridContext.Provider>
    );
  },
);

function calculatePercentage(value: `${number}%` | string, base: number) {
  return (parseFloat(value) / 100) * base;
}

type GridItemProps = ViewProps & {
  index?: number;
  colSpan?: number;
};

const GridItem = forwardRef<ElementRef<typeof View>, GridItemProps>(
  ({ colSpan = 1, ...props }, ref) => {
    const gridContextValue = useContext(GridContext);

    if (!gridContextValue) {
      throw new Error('GridItem must be used inside Grid.');
    }

    const { gridInnerWidth, gap, numColumns } = gridContextValue;

    const flexBasisValue = useMemo(() => {
      if (!gridInnerWidth) {
        return '100%';
      }

      const gridWidthWithoutGap = gridInnerWidth - gap * (numColumns - 1);

      // return `${Math.min((((colSpan / numColumns) * gridWidthWithoutGap + gap * (colSpan - 1)) / gridInnerWidth) * 100, 100)}%` satisfies DimensionValue;
      return Math.min(
        (colSpan / numColumns) * gridWidthWithoutGap + gap * (colSpan - 1),
        gridInnerWidth,
      );
    }, [colSpan, gap, gridInnerWidth, numColumns]);

    return (
      <View
        ref={ref}
        {...props}
        style={[{ width: '100%', flexBasis: flexBasisValue }, props.style]}
      />
    );
  },
);

Grid.displayName = 'Grid';
GridItem.displayName = 'GridItem';

export { Grid, GridItem };
