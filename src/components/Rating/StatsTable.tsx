import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { IStats } from '../../interfaces/quiz';
import { StyledTableCell, StyledTableRow } from './styles';
import { TableContainer, Paper, TableRow, TableHead, Typography } from '@mui/material';

export default function StatsTable({ stats }: { stats: IStats[] }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell align="right">Score</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((stat) => (
            <StyledTableRow key={stat.date}>
              <StyledTableCell>{stat.date}</StyledTableCell>
              <StyledTableCell>{stat.category}</StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="h5" color="secondary">
                  {stat.score}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
