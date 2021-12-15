# Cosmos Bookstore

Cosmos Bookstore is a sample books catalog application that demonstrates the capabilities of Azure Cosmos DB API for MongoDB.

Some of the functionalities being demonstrated are:

- Connecting to the database & the client configuration
- Reads & Queries
- Sorting & Indexing
- Updates
- Using different operators
- Checking RU cost of the previous operation
- Regex queries
- Aggregation pipelines
- Azure Search integration

## Deploy the app quickly

Clone this repository and navigate to the root of the directory.

Follow the steps below to deploy the app with minimal effort and begin experimenting with the application and the codebase.

### Deploy the resources to Azure

The template below deploys the application into an Azure App Service instance and creates an Azure Cosmos DB account.
Simply enter the Resource Group name in this template to deploy the resources.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fnayakshweta%2FCosmosBookstore%2Fmaster%2Fdeployment%2Fazuredeploy.json)

### Import the sample dataset into the Azure Cosmos DB API for MongoDB account

1. Navigate to folder ./deployment/seed using Git Bash.

2. Update .env file in this path by specifying value for "COSMOS_DB_CONNECTION_STRING" of the Cosmos DB account created by the deployment template in the previous step. 
You can get the connection string from Azure portal > Cosmos DB Account resource > Connection string blade > Primary connection string.
Example of updated .env file:
COSMOS_DB_CONNECTION_STRING="mongodb://accountname:passwordendingin==@accountname.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@accountname@"

3. Execute the seeding shell script with the command './seed_data.sh'. It may take a few minutes to seed the data into books and genres collections.\
Item count of books collection is ~85k and genres collection has only 1 item. \
Successful run result looks like this:
```
Preparing to import data...
Installing Node modules...
Populating database...
$$$ Seeding data started 9/30/2021, 10:29:05 AM
Fetching books
Fetching genres
Seeding completed on genres Collection 9/30/2021, 10:29:10 AM
Seeding completed on books Collection 9/30/2021, 10:39:40 AM
```


### Connect to the application

Now you can try out the application by browsing to the app service URL.
You can find the URL in the overview section of the App Service resource created by the deployment template.
![Cosmos Bookstore Main page](deployment/docs/images/cosmosbookstoremainpage.png)

### Setup Azure Search Integration

Optionally, you can [setup Azure Search integration](deployment/docs/azuresearchsetup.md) to try out the full text functionality in the app. 
> Azure Search support for Cosmos DB API for MongoDB is currently in preview, so the feature will explicitly need to be enabled for your subscription.

## Dataset Credits

The dataset used in this application is ["GoodReads 100k books"](https://www.kaggle.com/mdhamani/goodreads-books-100k) dataset from Kaggle.
