import db from './db.js';

async function getAllBooks(page = 0, limit = 20, sortby, rating, format, genre) {
    const connection = db.getConnection();


    // Sort by rating in descending order
    let sortCriteria = {};
    if (sortby == "rating") {
        sortCriteria = ["rating", -1];
    }

    // Start with default blank query to find all books without any parameters
    let queryObj = {};

    // Query based upon Rating. Use $gt operator to find rating > 1,2,3,4
    if (rating) {
        queryObj.rating = { $gt: rating };
    }

    // Query based upon Book Format. Use $in operator to find books matching formats mentioned in the comma-separated input
    if (format) {
        const formatList = Array.isArray(format) ? format : format.split(",");
        queryObj.bookformat = { $in: formatList };
    }

    // Query based upon Genre. Use $in operator to find books matching genres mentioned in the comma-separated input
    if (genre) {
        const genreList = Array.isArray(genre) ? genre : genre.split(",");
        queryObj.genre = { $in: genreList };
    }

    // Use cursor to the books list based upon the query criteria for the find method
    // Project title, author & img fields to return
    let cursor;
    cursor = await connection.collection('books').find(queryObj).project({ "title": 1, "author": 1, "img": 1 });

    // Apply the sort criteria on the cursor
    cursor = cursor.sort(sortCriteria);

    // Do Pagination based upon the page number by limiting to 20 books per iteration. Use limit and skip cursor methods
    const displayCursor = cursor.limit(limit).skip(page * limit)

    const books = await displayCursor.toArray();
    return books;
}

export default getAllBooks
export {getAllBooks}