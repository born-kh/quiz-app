import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Stack, Typography } from '@mui/material';
import StatsTable from './StatsTable';
import RatingTable from './RatingTable';
import quizStore from '../../store/quiz-store';

const Rating = observer(() => {
  return (
    <Stack spacing={2} direction="column">
      <Box>
        <Typography variant="h5">Rating</Typography>
        <RatingTable ratings={quizStore.quizSettingsStore.ratings} />
      </Box>
      {quizStore.quizSettingsStore.user && (
        <Box>
          <Typography variant="h5">My Stats ({quizStore.quizSettingsStore.user})</Typography>
          <StatsTable
            stats={quizStore.quizSettingsStore.stats.filter(
              (stat) => stat.user === quizStore.quizSettingsStore.user
            )}
          />
        </Box>
      )}
    </Stack>
  );
});

export default Rating;
