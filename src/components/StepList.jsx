import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useMediaQuery } from '@mui/material';

const StepList = ({ stepper, status }) => {

  const isSmallScreen = useMediaQuery("(max-width: 400px)");

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={status}
        alternativeLabel
        orientation={isSmallScreen ? "vertical" : "horizontal"}
      >
        {stepper.map((label) => (
          <Step key={label} className='m-auto'>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default StepList;
