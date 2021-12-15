const MongoClient = require("mongodb").MongoClient;
const fetch = require("node-fetch");
const yargs = require("yargs");
// destructure command line arguments
let { endpoint } = yargs.argv;
async function uploadBooks() {
  console.log("Fetching books");
  try {
    const target = `https://cosmosbookstorestg.blob.core.windows.net/bookstore/books.json`; //file
    const res = await fetch(target, {
      method: 'get',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      }
    });

    if (res.status === 200) {
      let books = await res.json();
      books.forEach(doc => {
        delete doc._id;
        doc.isbn = doc.isbn.toString();
        doc.isbn13 = doc.isbn13.toString();
      });
      await populateDb(books, "books");
    } else {
      console.log(`Error code ${res.status}`);
    }
  } catch (err) {
    console.log(err)
  }
}

async function uploadGenres() {
  console.log("Fetching genres");
  try {
    const target = `https://cosmosbookstorestg.blob.core.windows.net/bookstore/genres.json`; //file
    const res = await fetch(target, {
      method: 'get',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      }
    });

    if (res.status === 200) {
      const genres = [];
      let result = await res.json();
      delete result._id;
      genres.push(result);
      await populateDb(genres, "genres");
    } else {
      console.log(`Error code ${res.status}`);
    }
  } catch (err) {
    console.log(err)
  }
}

async function populateDb(data, collectionName) {
  MongoClient.connect(
    endpoint,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      sslValidate: false,
    },
    (error, client) => {
      if (error) {
        throw error;
      } 
      database = client.db("cosmosbookstore");
      collection = database.collection(collectionName);
      let batch = collection.initializeOrderedBulkOp();

      for (let i = 0; i <= data.length; i += 1) { 
        if (data[i]) {
          batch.insert(data[i]);
        }
      }
      batch.execute().then(() => console.log("Seeding completed on " + collectionName + " Collection", new Date().toLocaleString()))
        .catch(err => {
          console.error(JSON.stringify(err));
          process.exit(1);
        });
    });
};
console.log("$$$ Seeding data started " + new Date().toLocaleString());
uploadBooks();
uploadGenres();

