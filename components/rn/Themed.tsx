/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView, TextInput as DefaultTextInput, ScrollView as DefaultScrollView, TouchableOpacity as DefaultTouchableOpacity } from 'react-native';
import { ComponentProps } from 'react';

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & ComponentProps<typeof DefaultText>;
export type ViewProps = ThemeProps & ComponentProps<typeof DefaultView>;
export type TextInputProps = ThemeProps & ComponentProps<typeof DefaultTextInput>;
export type ScrollViewProps = ThemeProps & ComponentProps<typeof DefaultScrollView>;
export type TouchableOpacityProps = ThemeProps & ComponentProps<typeof DefaultTouchableOpacity>;

export function useThemeColor (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
)

{
  const theme = useColorScheme() ?? 'light';
  
  const colorFromProps = props[ theme ];

  if ( colorFromProps )
  {
    return colorFromProps;
  } else
  {
    return Colors[ theme ][ colorName ];
  }
}

export function Text ( props: TextProps )
{
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor( { light: lightColor, dark: darkColor }, 'text' );

  return <DefaultText style={ [ { color }, style ] } { ...otherProps } />;
}

export function View ( props: ViewProps )
{
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor( { light: lightColor, dark: darkColor }, 'background' );

  return <DefaultView style={ [ { backgroundColor }, style ] } { ...otherProps } />;
}

export function Card ( props: ViewProps )
{
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor( { light: lightColor || '#ffffff', dark: darkColor || '#1c1c1e' }, 'background' );
  const borderColor = useThemeColor( { light: '#e5e7eb', dark: '#2c2c2e' }, 'background' );

  return (
    <DefaultView
      style={ [
        {
          backgroundColor,
          borderColor,
          borderWidth: 1,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          overflow: 'hidden'
        },
        style
      ] }
      { ...otherProps }
    />
  );
}

export function TextInput ( props: TextInputProps )
{
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor( { light: lightColor, dark: darkColor }, 'text' );
  const backgroundColor = useThemeColor( { light: '#f9fafb', dark: '#2c2c2e' }, 'background' );
  const borderColor = useThemeColor( { light: '#e5e7eb', dark: '#3c3c3e' }, 'background' );

  return (
    <DefaultTextInput
      style={ [
        {
          color,
          backgroundColor,
          borderColor,
          borderWidth: 1,
          borderRadius: 12,
          padding: 12
        },
        style
      ] }
      placeholderTextColor={ useThemeColor( {}, 'tabIconDefault' ) }
      { ...otherProps }
    />
  );
}

export function ScrollView ( props: ScrollViewProps )
{
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor( { light: lightColor, dark: darkColor }, 'background' );

  return <DefaultScrollView style={ [ { backgroundColor }, style ] } { ...otherProps } />;
}

export function TouchableOpacity ( props: TouchableOpacityProps )
{
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor( { light: lightColor, dark: darkColor }, 'background' );

  return <DefaultTouchableOpacity style={ [ { backgroundColor }, style ] } { ...otherProps } />;
}