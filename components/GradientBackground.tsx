import React, { ReactNode } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientBackgroundProps
{
    children: ReactNode;
    imageSource: any;
    gradientColors?: [ string, string ] | [ string, string, ...string[] ]; // Định nghĩa kiểu dữ liệu chính xác
    opacity?: number;
}

export default function GradientBackground ( {
    children,
    imageSource,
    gradientColors = [ 'rgba(28, 64, 242, 0.8)', 'rgba(0, 0, 0, 0.6)' ],
    opacity = 0.7,
}: GradientBackgroundProps )
{
    return (
        <ImageBackground
            source={ imageSource }
            style={ styles.background }
            imageStyle={ { opacity } }
        >
            <LinearGradient
                colors={ gradientColors as [ string, string, ...string[] ] }
                style={ styles.gradient }
                start={ { x: 0, y: 0 } }
                end={ { x: 1, y: 1 } }
            >
                { children }
            </LinearGradient>
        </ImageBackground>
    );
}

const styles = StyleSheet.create( {
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
} );