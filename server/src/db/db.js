import  MongoClient  from 'mongodb';

const DB_NAME = 'cosmosbookstore';

const db = {
    _dbClient: null,
    connect: async function(url) {
        // Use connection pool size of 10 by default
        const client = await MongoClient.connect(url, {
            poolSize: 10,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Cosmos DB's API for MongoDB connected")
        this._dbClient = client;
    },
    
    getConnection: function() {
        if (!this._dbClient) {
            console.log('You need to call .connect() first!');
            process.exit(1);
        }
        return this._dbClient.db(DB_NAME);
    }
}
export default db
export {db}