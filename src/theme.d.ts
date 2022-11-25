import { ThemeOptions } from '@mui/material/styles';
import React from 'react';

declare module '@mui/material/styles' {
	interface Theme {
		status: {
			danger: string;
		};
    shape: {
      buttonBorderRadius?: string
      inputBorderRaduis: string
    },
	}
	interface ThemeOptions {
		status: {
			danger: React.CSSProperties['color'];
		};
    shape: {
      buttonBorderRadius?: React.CSSProperties['border-radius'],
      inputBorderRaduis: React.CSSProperties['border-radius']
    }
	}
	interface Palette {
		neutral?: PaletteColor;
	}
	interface PaletteOptions {
		neutral?: PaletteColorOptions;
	}
	interface SimplePaletteColorOptions {
		darker?: string;
	}
	interface PaletteColor {
		darker?: string;
	}
}
