import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LocationDetails from '../Location/LocationDetails';
import {
    Button
} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function CustomizedTables(props) {
    const classes = useStyles();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        setBooks(props.filteredBooks);
    }, [props.filteredBooks]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>TITULO DEL LIBRO</StyledTableCell>
                        <StyledTableCell align="right">VOLUMEN</StyledTableCell>
                        <StyledTableCell align="right">COORDENADAS</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <StyledTableRow key={book.id}>
                            <StyledTableCell component="th" scope="row">
                                {book.title}
                            </StyledTableCell>
                            <StyledTableCell align="right">{book.volumeNumber}</StyledTableCell>
                            <StyledTableCell align="right">
                                <LocationDetails location={book.locationViewModel} />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
