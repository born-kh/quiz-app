import React from 'react';
import { observer } from 'mobx-react-lite';
import quiz from '../../store/quiz-store';
import { Button, Stack } from '@mui/material';
import Rating from '../Rating';
import QuizSettings from './Settings';
import Question from './Question';
import { StartType } from '../../interfaces/quiz';

const Quiz = observer(() => {
  return (
    <Stack>
      {!quiz.quizSettingsStore.startType ? (
        <>
          <Button
            variant="contained"
            sx={{ alignSelf: 'flex-end' }}
            onClick={() => quiz.quizSettingsStore.setStartType(StartType.Settings)}
          >
            Start
          </Button>
          <Rating />
        </>
      ) : quiz.quizSettingsStore.startType === StartType.Question ? (
        <Question />
      ) : (
        <QuizSettings />
      )}
    </Stack>
  );
});

export default Quiz;
