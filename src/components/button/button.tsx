import type { ComponentProps } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export interface ButtonProps
  extends Omit<ComponentProps<typeof TouchableOpacity>, 'children' | 'style'> {
  text: string;
}

export function Button({ text, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} {...props}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'purple',
    borderRadius: 8,
  },
  text: { color: 'white' },
});
