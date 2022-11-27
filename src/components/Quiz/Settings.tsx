import React, { useEffect } from 'react';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import quizStore from '../../store/quiz-store';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { observer } from 'mobx-react-lite';
import CircularProgress from '@mui/material/CircularProgress';
import { StartType } from '../../interfaces/quiz';

const QuizSettings = observer(() => {
  const { quizSettingsStore } = quizStore;

  const handleChangeCategory = (event: SelectChangeEvent) => {
    quizSettingsStore.setCategoryId(Number(event.target.value));
  };
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    quizSettingsStore.setUser(event.target.value);
  };
  useEffect(() => {
    quizStore.quizSettingsStore.fetchCategories();
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
        <>
          <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ width: 360 }}>
            <Typography variant="h4">Quiz settings</Typography>
            <TextField
              id="name-input"
              label="Name"
              variant="outlined"
              value={quizSettingsStore.user}
              onChange={handleChangeName}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="category-label">Select Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={quizSettingsStore.selectedCategoryId?.toString() || ''}
                label="Select Category"
                onChange={handleChangeCategory}
                fullWidth
              >
                {quizSettingsStore.categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              disabled={!quizSettingsStore.user.trim() || !quizSettingsStore.selectedCategoryId}
              onClick={() => quizSettingsStore.setStartType(StartType.Question)}
            >
              Submit
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
});

export default QuizSettings;
