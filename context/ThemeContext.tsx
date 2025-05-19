import React, { createContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps
{
    theme: Theme;
    toggleTheme: () => void;
}

// BẮT BUỘC phải export context này
export const ThemeContext = createContext<ThemeContextProps>( {
    theme: 'light',
    toggleTheme: () => { },
} );

export const ThemeProvider = ( { children }: { children: ReactNode } ) =>
{
    const [ theme, setTheme ] = useState<Theme>( 'light' );

    const toggleTheme = () =>
    {
        setTheme( prev => ( prev === 'light' ? 'dark' : 'light' ) );
    };

    return (
        <ThemeContext.Provider value={ { theme, toggleTheme } }>
            { children }
        </ThemeContext.Provider>
    );
};
