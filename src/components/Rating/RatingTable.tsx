import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { IRating } from '../../interfaces/quiz';
import { StyledTableCell, StyledTableRow } from './styles';
import { TableContainer, Paper, TableRow, TableHead, Typography } from '@mui/material';

export default function RatingTable({ ratings }: { ratings: IRating[] }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Position</StyledTableCell>
            <StyledTableCell>User</StyledTableCell>
            <StyledTableCell align="right">Score</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ratings
            .sort((a, b) => b.score - a.score)
            .map((rating, index) => (
              <StyledTableRow key={rating.user}>
                <StyledTableCell align="left">{index + 1}</StyledTableCell>
                <StyledTableCell>{rating.user}</StyledTableCell>
                <StyledTableCell align="right">
                  <Typography variant="h5" color="secondary">
                    {rating.score}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
