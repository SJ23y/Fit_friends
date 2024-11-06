import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Slider } from '@mui/material';

type CustomSliderProps = {
  max: number;
  min: number;
  value: [number, number];
  onChange: (event: Event, value: number | number[], activeThumb: number) => void;
  ariaLabel: string;
  valueLabelDisplay: "auto" | "on" | "off";
}

function CustomSlider({ max, min, value, onChange, ariaLabel, valueLabelDisplay}: CustomSliderProps) {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#333'
      },
      secondary: {
        main: '#333'
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: 312 }}>
        <Slider
          color='primary'
          getAriaLabel={() => ariaLabel}
          max={max}
          min={min}
          value={value}
          onChange={onChange}
          valueLabelDisplay={valueLabelDisplay}
          sx={{
            '& .MuiSlider-thumb': {
              width: '16px',
              height: '16px'
            },
            '& .MuiSlider-rail': {
              width: '312px',
              height: '1px',
              color: '#aeaeae'
            },
            '& .MuiSlider-track': {
              width: '312px',
              height: '1px'
            },
            '& .MuiSlider-valueLabelOpen': {
              transform: 'translateY(100%) scale(1) !important',
              color: '#333',
              fontSize: '16px',
              background: 'none'
            },
          }}
        />
      </Box>
    </ThemeProvider>
  );
}

export default CustomSlider;
