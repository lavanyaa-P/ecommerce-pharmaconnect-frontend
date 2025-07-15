import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchSellerProduct } from '../../../State/seller/sellerProductSlice';
import { Product } from '../../../types/ProductTypes';
import { Button, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

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

export default function ProductTable() {
    const dispatch = useAppDispatch();
    const { sellerProduct } = useAppSelector(store => store);

    React.useEffect(() => {
        dispatch(fetchSellerProduct(localStorage.getItem('jwt')))
    }, [dispatch]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell>MRP</StyledTableCell>
                        <StyledTableCell>Selling Price</StyledTableCell>
                        <StyledTableCell>Update Stock</StyledTableCell>
                        <StyledTableCell>Update</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sellerProduct.products.map((item: Product) => (
                        <StyledTableRow key={item.id}>
                            <StyledTableCell align="left">{item.title}</StyledTableCell>
                            <StyledTableCell align="right">{item.mrpPrice}</StyledTableCell>
                            <StyledTableCell align="right">{item.sellingPrice}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button size='small'>
                                    In_Stock
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <IconButton>
                                    <Edit />
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
