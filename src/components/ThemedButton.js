import React, { useContext } from 'react';
import {Button} from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { defaultTheme, ThemeContext, Themes } from '../theme/ThemeContext';

function ThemedButton(props) {
    const theme = useContext(ThemeContext);
    return (
        <Button 
            className={props.className} 
            onClick={props.onClick}  
            variant={theme.currentTheme !== Themes.LIGHT ? "primary" : "outline-primary"} 
            style={theme, props.style}
            disabled={props.disabled}
        >
            {props.children}
        </Button>
    )
}

export default ThemedButton;