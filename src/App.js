import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookShelfs from './BookShelfs';
import * as API from './BooksAPI';
import Search from './Search';

const App = props => {

	const [books, setBooks] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const getAllBooks = async () => {
			const temp = await API.getAll();
			setBooks(temp);
			setLoaded(true);
		}
		getAllBooks();
	}, []);

	const updateBook = async (book, shelf) => {
		if (!shelf || shelf === `backdropClick`) { return };
		if (shelf === `none`) {
			await API.update(book, 'none');
			setBooks([...books].filter(item => item.id !== book.id));
			return
		}

		await API.update(book, shelf);
		const isExist = books.find(item => item.id === book.id);
		let tempBook = book;
		tempBook.shelf = shelf;
		if (!isExist) {
			const tempBooks = [...books, tempBook];
			setBooks(tempBooks);
			return
		};
		const tempBooks = [...books].map(item => item.id === book.id ? tempBook : item);
		setBooks(tempBooks);
	}

	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='/' element={
						<BookShelfs
							loaded={loaded}
							books={books}
							onUpdateBook={(book, shelf) => updateBook(book, shelf)}
						/>
					} />
					<Route path='/search' element={
						<Search 
							existBooks={books}
							onUpdateBook={(book, shelf) => updateBook(book, shelf)}
						/>
					} />
				</Routes>
			</Router>
		</div>
	)
}

export default App;
