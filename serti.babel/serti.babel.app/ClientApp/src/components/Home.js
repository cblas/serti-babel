import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BooksTable from './Book/BooksTable';
import BookCreate from './Book/BookCreate';
import Search from '../components/Book/BookSearch';
import BookService from '../../src/services/book.service';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));


export default function Home() {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const searchInput = useRef(null);
    const [books, setBooks] = useState([]);

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value);
    }, []);

    useEffect(() => {
        BookService.get()
            .then(response => {
                setBooks(response.data);
            })
    }, []);

    const filteredBooks = useMemo(() =>
        books.filter(book => {
            return book.title.toLowerCase().includes(search.toLowerCase());
        }), [books, search]
    );

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Biblioteca BABEL
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            BIBLIOTECA BABEL
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Buscar libro:
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />
                                </Grid>
                                <Grid item>
                                    <BookCreate />
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <BooksTable filteredBooks={filteredBooks}/>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
        </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    SERTI EVALUATION
        </Typography>
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}