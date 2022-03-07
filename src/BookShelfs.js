import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { IoSearchOutline } from "react-icons/io5";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Book from './Book';
import { useNavigate } from 'react-router-dom';
import getDefaultShelfs from './DefaultShelfs';


const shelfs = getDefaultShelfs();

const Shelf = props => {
    const { shelfname, books, onUpdateBook } = props;
    return (
        <Paper sx={{
            p: 2,
            marginBottom: 2
        }}>
            <Typography variant='h4' sx={{ p: 2 }}>{shelfname.charAt(0).toUpperCase() + shelfname.slice(1).replace(/([A-Z])/g, " $1")}</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
            {
                books.map(book => (
                    <Book
                        key={`book-${book.id}`}
                        book={book}
                        shelfs={shelfs}
                        onUpdateBook={(book, shelf) => onUpdateBook(book, shelf)}
                    />
                ))
            }
            </Box>
        </Paper>
    )
}

const BookShelfs = props => {
    const { loaded, books, onUpdateBook } = props;
    const navigate = useNavigate();

    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My Reads
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={() => {
                            navigate('/search');
                        }}
                    >
                        <IoSearchOutline/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            {
                loaded && <Container sx={{p:2}}>
                    {
                        shelfs.map(shelf => (
                            <Shelf
                                key={`shelf-${shelf}`}
                                shelfname={shelf}
                                books={books.filter(book => book.shelf === shelf)} 
                                onUpdateBook={(book, shelf) => onUpdateBook(book, shelf)}
                            />
                        ))
                    }
                </Container>
            }
        </>
    )
}

export default BookShelfs;