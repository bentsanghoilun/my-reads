import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { IoSearchOutline, IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { Paper } from '@mui/material';
import { Box } from '@mui/material';
import * as API from './BooksAPI';
import Book from './Book';
import debounce from 'lodash.debounce';
import getDefaultShelfs from './DefaultShelfs';

const shelfs = getDefaultShelfs();

const fetchData = async (query, cb) => {
    if (query === '') {
        cb(null);
        return;
    };
    const res = await API.search(query);
    cb(res);
};

const debouncedFetchData = debounce((query, cb) => {
    fetchData(query, cb);
   }, 500);

const Search = props => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const { onUpdateBook, existBooks } = props;

    useEffect(() => {
        debouncedFetchData(query, res => {
            if (!res || res.error) {
                setResults([]);
            } else {
                let tempBooks = [...res];
                tempBooks.forEach(book => {
                    const existBook = existBooks.find(item => item.id === book.id);
                    if (existBook) {
                        book.shelf = existBook.shelf;
                    }
                })
                setResults(res);
            }
        });
    }, [query, existBooks]);

    return (
        <>
            <AppBar color='transparent' position='static'>
                <Toolbar>
                    <IconButton
                        sx={{ marginRight: '1rem' }}
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        <IoChevronBack/>
                    </IconButton>
                    <IoSearchOutline style={{marginRight: '12px'}} />
                    <InputBase placeholder='Search Books' value={query} onChange={(e) => {
                        setQuery(e.currentTarget.value)
                    }} />
                </Toolbar>
            </AppBar>
            
            <Container sx={{p:2}}>
                {(results && results.length > 0) &&
                    <Paper sx={{ p: 2, m: 2 }} >
                        <Typography variant='h6'>Results</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            {
                                results.filter(book => book.imageLinks !== undefined && book.imageLinks.thumbnail !== undefined).map(book => (
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
                }
            </Container>

        </>
    )
}

export default Search;