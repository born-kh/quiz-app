import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button, CircularProgress, Paper, Stack, TextField, Typography } from '@mui/material';
import quizStore from '../../store/quiz-store';

const Question = observer(() => {
  const { questionStore, quizSettingsStore } = quizStore;

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    questionStore.setAnswer(event.target.value);
  };
  useEffect(() => {
    quizStore.quizSettingsStore.fetchCategory();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {quizSettingsStore.isLoading ? (
        <CircularProgress size={50} />
      ) : (
        <Paper sx={{ padding: 2, minHeight: 250 }}>
          <Stack spacing={2} alignItems="center" sx={{ width: 400 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Category: </Typography>
                <Typography color="primary" variant="h6">
                  {quizSettingsStore.category?.title}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Score: </Typography>
                <Typography variant="h5" color="secondary">
                  {quizSettingsStore.score}
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="h4">
              Question {questionStore.currentQuestionIndex + 1}/{questionStore.questions.length}
            </Typography>
            <Typography>{questionStore.currentQuestion?.question}</Typography>

            <TextField
              sx={{ justifySelf: 'flex-end' }}
              hiddenLabel
              placeholder="Enter your asnwer"
              variant="outlined"
              value={questionStore.answer}
              onChange={handleChangeAnswer}
              fullWidth
            />

            <Button
              variant="contained"
              sx={{ justifySelf: 'flex-end' }}
              disabled={!questionStore.answer}
              onClick={() => questionStore.nextQuestion()}
            >
              {questionStore.currentQuestionIndex === questionStore.questions.length - 1
                ? 'Finish'
                : 'Next'}
            </Button>
          </Stack>
        </Paper>
      )}
    </Box>
  );
});

export default Question;
