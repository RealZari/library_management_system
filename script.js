let users = [
    { id: 1, email: 'admin@gmail.com', password: 'admin123', role: 'Admin', name: 'Admin User', status: 'active' },
    { id: 2, email: 'student@hotmail.com', password: 'student123', role: 'Student', name: 'Student User', status: 'active' },
    { id: 3, email: 'teacher@outlook.com', password: 'teacher123', role: 'Teacher', name: 'Teacher User', status: 'active' }
];

// Sample book data
let books = [
    { title: 'The Alchemist', pages: 200, publisher: 'Paulo Coelho Publishers', author: 'Paulo Coelho', edition: '3rd' },
    { title: 'Think and Grow Rich', pages: 150, publisher: 'Hill Publishers', author: 'Napoleon hill', edition: '2nd' },
    { title: 'The Power of Now', pages: 198, publisher: 'Eckhart Publishers', author: 'Eckhart Tolle', edition: '2nd' },
    { title: 'Rich Dad Poor Dad', pages: 353, publisher: 'Robert', author: 'Robert Kiyosaki', edition: '9th' },
    { title: 'Mans Search for Meaning', pages: 345, publisher: 'Viktor', author: 'Viktor Frankl', edition: '7th' },
    { title: 'The Power of Habit', pages: 233, publisher: 'Charles ', author: 'Charles Duhigg', edition: '2nd' },
    { title: 'Getting Things Done', pages: 768, publisher: 'David', author: 'David Allen', edition: '9th' },
    { title: 'Outliers', pages: 678, publisher: 'Gladwell Publishers', author: 'Mal Gladwell', edition: '10th' }
];

// Sample borrowed and returned books data
let borrowedBooks = [
    { userId: 2, title: 'The Power of Positive Thinking', author: 'Norman' },
    { userId: 2, title: 'The Alchemist', author: 'Paulo coelho' },
    { userId: 3, title: 'Blink', author: 'Mal Gladwell' },
    { userId: 3, title: 'Atomic Habits', author: 'James Clear' }
];
let returnedBooks = [
    { userId: 2, title: 'Atomic Habits', author: 'James Clear' },
    { userId: 2, title: 'Blink', author: 'Mal Gladwell' },
    { userId: 3, title: 'The Alchemist', author: 'Paulo coelho' },
    { userId: 3, title: 'The Power of Positive Thinking', author: 'Norman' }
];

// Sample book request data
let requestedBooks = [];

// Current logged-in user (to simulate session)
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        currentUser = users.find(user => user.email === email && user.password === password && user.role === role);
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            if (role === 'Admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'user_dashboard.html';
            }
        } else {
            alert('Invalid credentials');
        }
    });
}

// Signup
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert('User already exists with this email');
            return;
        }

        // Add new user
        users.push({ id: users.length + 1, name, email, password, role, status: 'active' });
        alert('Account created successfully!');
        window.location.href = 'index.html';
    });
}

// Admin - Add/Edit Book
if (document.getElementById('addBookButton')) {
    document.getElementById('addBookButton').addEventListener('click', function () {
        document.getElementById('bookModal').style.display = 'block';
    });

    document.getElementsByClassName('close')[0].addEventListener('click', function () {
        document.getElementById('bookModal').style.display = 'none';
    });

    document.getElementById('bookForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const pages = document.getElementById('pages').value;
        const publisher = document.getElementById('publisher').value;
        const author = document.getElementById('author').value;
        const edition = document.getElementById('edition').value;
        books.push({ title, pages, publisher, author, edition });
        alert('Book added successfully!');
        document.getElementById('bookModal').style.display = 'none';
        // Update book list display
        displayBooksAdmin();
    });
    function displayBooksAdmin() {
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';
        
        books.forEach((book, index) => {
            const bookItem = document.createElement('div');
            bookItem.innerHTML = `${index + 1}. ${book.title} (${book.edition} Edition) by ${book.author}`;
            bookList.appendChild(bookItem);
        });
    }
    
    // Search for books
    document.getElementById('searchBook').addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(query) || 
            book.author.toLowerCase().includes(query) || 
            book.publisher.toLowerCase().includes(query)
        );
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';
        filteredBooks.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.innerHTML = `${book.title} (${book.edition} Edition) by ${book.author}`;
            bookList.appendChild(bookItem);
        });
    });

    displayBooksAdmin();
}

// Admin - User Management
function displayUsersAdmin() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.filter(user => user.role !== 'Admin').forEach(user => {
        const userItem = document.createElement('div');
        userItem.style.padding = '10px';
        userItem.style.marginBottom = '10px';
        userItem.style.border = '1px solid #ddd';
        userItem.style.borderRadius = '5px';
        userItem.style.backgroundColor = '#f9f9f9';
        userItem.style.display = 'flex';
        userItem.style.justifyContent = 'space-between';
        userItem.style.alignItems = 'center';
        userItem.style.fontFamily = 'Arial, sans-serif';
        
        userItem.innerHTML = `${user.name} (${user.role}) - ${user.email} [${user.status}]`;

        const buttonStyle = 'padding: 5px 10px; border: none; border-radius: 5px; cursor: pointer; font-size: 0.9em; color: #fff; margin-left: 5px;';

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.style.backgroundColor = '#FF4C4C'; 
        removeButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        removeButton.style.transition = 'background-color 0.3s ease';
        removeButton.style.cssText += buttonStyle;
        removeButton.addEventListener('click', () => removeUser(user.id));

        const suspendButton = document.createElement('button');
        suspendButton.innerText = 'Suspend';
        suspendButton.style.backgroundColor = '#FFC107'; 
        suspendButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        suspendButton.style.transition = 'background-color 0.3s ease';
        suspendButton.style.cssText += buttonStyle;
        suspendButton.addEventListener('click', () => suspendUser(user.id));

        userItem.appendChild(removeButton);
        userItem.appendChild(suspendButton);
        userList.appendChild(userItem);
    });
}

function removeUser(userId) {
    users = users.filter(user => user.id !== userId);
    displayUsersAdmin();
}

function suspendUser(userId) {
    users = users.map(user => user.id === userId ? { ...user, status: 'suspended' } : user);
    displayUsersAdmin();
}

if (document.getElementById('userList')) {
    displayUsersAdmin();
}

// Admin - Requested Books
function displayRequestedBooks() {
    const requestedBooksDiv = document.getElementById('requestedBooks');
    requestedBooksDiv.innerHTML = '';
    requestedBooks.forEach(request => {
        const requestItem = document.createElement('div');
        requestItem.innerHTML = `Book: ${request.title}, Requested by: ${request.user.name} (${request.user.role})`;
        requestedBooksDiv.appendChild(requestItem);
    });
}

if (document.getElementById('requestedBooks')) {
    displayRequestedBooks();
}

// User - Request Book
if (document.getElementById('requestForm')) {
    document.getElementById('requestForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('requestedBookTitle').value;
        if (currentUser) {
            requestedBooks.push({ title, user: currentUser });
            alert('Book requested successfully!');
            document.getElementById('requestedBookTitle').value = '';
            // Update the requested books display in admin
            if (document.getElementById('requestedBooks')) {
                displayRequestedBooks();
            }
        } else {
            alert('You must be logged in to request a book.');
        }
    });
}

// User - Display Available Books
function displayAvailableBooks() {
    const availableBooksDiv = document.getElementById('availableBooks');
    availableBooksDiv.innerHTML = '';
    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.innerHTML = `${book.title} (${book.edition} Edition) by ${book.author}`;
        availableBooksDiv.appendChild(bookItem);
    });
}

if (document.getElementById('availableBooks')) {
    displayAvailableBooks();
}

// User - Currently Borrowed Books
function displayBorrowedBooks() {
    const borrowedBooksDiv = document.getElementById('borrowedBooks');
    borrowedBooksDiv.innerHTML = '';
    borrowedBooks.filter(borrow => borrow.userId === currentUser.id).forEach(borrow => {
        const borrowItem = document.createElement('div');
        borrowItem.innerHTML = `${borrow.title} by ${borrow.author}`;
        borrowedBooksDiv.appendChild(borrowItem);
    });
}

if (document.getElementById('borrowedBooks')) {
    displayBorrowedBooks();
}

// User - List of Returned Books
function displayReturnedBooks() {
    const returnedBooksDiv = document.getElementById('returnedBooks');
    returnedBooksDiv.innerHTML = '';
    returnedBooks.filter(returned => returned.userId === currentUser.id).forEach(returned => {
        const returnedItem = document.createElement('div');
        returnedItem.innerHTML = `${returned.title} by ${returned.author}`;
        returnedBooksDiv.appendChild(returnedItem);
    });
}

if (document.getElementById('returnedBooks')) {
    displayReturnedBooks();
}
