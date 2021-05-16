import React from "react"

export const Themes = {
    LIGHT: {
        backgroundColor: "white",
        color: "black",
    },
    DARK: {
        backgroundColor: "black",
        color: "white",
    }
}

export const defaultTheme = Themes.LIGHT;

export const ThemeContext = React.createContext(defaultTheme);
