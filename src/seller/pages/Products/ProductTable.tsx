import React, { useEffect } from 'react'
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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ProductTable() {

    const dispatch = useAppDispatch();
    const { sellerProduct } = useAppSelector(store => store);

    React.useEffect(() => {
        dispatch(fetchSellerProduct(localStorage.getItem('jwt')))
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Images</StyledTableCell>
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
                            <StyledTableCell align="center">
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                    {item.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src="http://localhost:5454/images/${image}"
                                            alt="product"
                                            style={{ width: 60, height: 60, objectFit: "cover" }}
                                        />
                                    ))}
                                </div>
                            </StyledTableCell>


                            <StyledTableCell align="right">{ item.title }</StyledTableCell>
                            <StyledTableCell align="right">{ item.mrpPrice }</StyledTableCell>
                            <StyledTableCell align="right">{ item.sellingPrice }</StyledTableCell>
                            <StyledTableCell align="right">{ 
                            <Button size='small'>
                                In_Stock
                            </Button>
                            }</StyledTableCell>
                            <StyledTableCell align="right">{ 
                            <IconButton>
                                <Edit/>
                            </IconButton>
                            }</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}