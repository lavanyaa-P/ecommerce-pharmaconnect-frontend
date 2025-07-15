import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { HomeCategory } from '../../../types/homeCategoryType';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// ✅ Correct prop typing
type Props = {
    data: HomeCategory[];
};

export default function HomeCategoryTable({ data }: Props) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>No</StyledTableCell>
                        <StyledTableCell>Id</StyledTableCell>
                        <StyledTableCell>Image</StyledTableCell>
                        <StyledTableCell>Category</StyledTableCell>
                        <StyledTableCell>Update</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((Category, index) => (
                        <StyledTableRow key={Category.id || index}>
                            <StyledTableCell>{index + 1}</StyledTableCell>
                            <StyledTableCell>{Category.categoryId}</StyledTableCell>
                            <StyledTableCell>
                                <img
                                    className="w-20 rounded-md"
                                    src={Category.image}
                                    alt={Category.name || "Category"}
                                />
                            </StyledTableCell>
                            <StyledTableCell>{Category.name}</StyledTableCell>
                            <StyledTableCell>
                                <Button>
                                    <Edit />
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
