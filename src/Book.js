import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import { AiOutlineCheck } from "react-icons/ai";
import Tooltip from '@mui/material/Tooltip';

const CustomTooltip = props => {
    const { bookTitle, authors } = props;
    return (
        <Tooltip
            arrow
            title={
                <>
                    <h3>{bookTitle}</h3>
                    <p>{ authors.join(', ')}</p>
                </>
            }
        >
            {props.children}
        </Tooltip>
    )
}

const Book = props => {
    const { book, shelfs, onUpdateBook } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = (book, shelf) => {
        setAnchorEl(null);
        onUpdateBook(book, shelf);
    }

    return (
        <>
            <CustomTooltip
                bookTitle={book.title}
                authors={book.authors || []}
            >
                <img
                    src={book.imageLinks.thumbnail}
                    alt={book.title} 
                    className={`book-cover${open ? ' focused' : ''}`}
                    onClick={handleClick}
                />
            </CustomTooltip>
            
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{'aria-labelledby': 'basic-button'}}
            >
                <MenuItem disabled >Move To:</MenuItem>
                <Divider />
                {
                    shelfs.map(shelf => (
                        <MenuItem
                            key={`book-${book.id}-menu-item-${shelf}`}
                            selected={shelf === book.shelf}
                            onClick={() => handleClose(book, shelf)}
                        >
                            {
                                shelf === book.shelf && <AiOutlineCheck style={{marginRight: '8px'}} />
                            }
                            {shelf.charAt(0).toUpperCase() + shelf.slice(1).replace(/([A-Z])/g, " $1")}
                        </MenuItem>
                    ))
                }
                <Divider />
                <MenuItem
                    key={`book-${book.id}-menu-item-none}`}
                    selected={!book.shelf}
                    onClick={() => handleClose(book, `none`)}
                >
                    { !book.shelf && <AiOutlineCheck style={{marginRight: '8px'}} /> }
                    None
                </MenuItem>
            </Menu>
        </>
    )
}

export default Book;