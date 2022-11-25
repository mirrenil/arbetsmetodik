import { Box, styled, Typography } from '@mui/material';
import { typography } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
	height: '250px',
	width: '250px',
	backgroundColor: theme.palette.primary.darker,
  borderRadius: theme.shape.buttonBorderRadius
}));

export const MuiResponsiveness = () => {
	return (
		<>
			<Box
				sx={{
					height: '300px',
					width: {
						xs: 100,
						sm: 200,
						md: 300,
						lg: 400,
						xl: 500,
					},
					bgcolor: 'secondary.light',
				}}
			></Box>
      <StyledBox />
		</>
	);
};
