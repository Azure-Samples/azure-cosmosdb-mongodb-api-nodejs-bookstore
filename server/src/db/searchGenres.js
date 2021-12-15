import  db  from './db.js';
import assert from 'assert'

 const searchGenres = async (searchString) => {
    const connection = db.getConnection();

    // Regex search with the searchString on the list of genres
    // Uses aggregation pipeline with $unwind, $match and $group pipeline stages.
    const aggCursor = await connection.collection('genres').aggregate([
                                                        {$unwind : "$genresList"},
                                                        {$match: {"genresList": {$regex: new RegExp(searchString, "i")}}},
                                                        {$group: {_id: null, genres: {$push: "$genresList"}}}
                                                    ])

    // Check the request charge for the previous operation
    connection.command({ getLastRequestStatistics: 1 }, function(err, result) {
        assert.strictEqual(err, null);
        const requestCharge = result['RequestCharge'];
        console.log("Request charge for the search genres pipeline was: ", requestCharge);
    });

    //Convert pipeline cursor to an array
    const genres = await aggCursor.toArray();

    return genres[0].genres;
}
export default searchGenres
export {searchGenres}