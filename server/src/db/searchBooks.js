import { SearchClient, AzureKeyCredential, odata } from "@azure/search-documents";

import dotenv from "dotenv";
dotenv.config();
const searchBooks = async (skip=0, top=20, searchString, orderby, rating, format, genre) => {

    const endpoint = process.env.SEARCH_API_ENDPOINT || "";
    const apiKey = process.env.SEARCH_API_KEY || "";
    const indexName = process.env.SEARCH_INDEX_NAME || "";

    
    // Setting up an Azure Search client
    const searchClient = new SearchClient(endpoint, indexName, new AzureKeyCredential(apiKey));

    // Add the list of OData $orderby expressions by which to sort the results. 
    let orderByOption = [];
    if (orderby == "rating") {
        orderByOption.push("rating desc");
    }

    // Build the OData $filter expression to apply to the search query.
    let filterOption = "";

    // Filter using comparison operator
    if (rating) {
        filterOption === "" ? filterOption+=`rating gt ${rating}` : filterOption+=` and rating gt ${rating}`;
    }

    // Filter using search.in function to see if the bookformat field is in given list of values
    if (format) {
        filterOption === "" ? filterOption+=`search.in(bookformat, '${format}')` : filterOption+=` and search.in(bookformat, '${format}')`
    }

    // Filter using search.ismatch function if the genre field matches with the specified genre
    if (genre) {
        const genreList = Array.isArray(genre) ? genre : genre.split(",");
        if (genreList.length === 1) {
            filterOption === "" ? filterOption+=`search.ismatch('${genreList}', 'genre')` : filterOption+=` and search.ismatch('${genreList}', 'genre')`
        }
        else {
            if (filterOption === "") {
                filterOption+=`search.ismatch('${genreList}', 'genre')`;
            }
            else {
                filterOption+="and ( ";
                for (let i=0; i<genreList.length; i++) {
                    filterOption+=`search.ismatch('${genreList[i]}', 'genre')`;
                    if (i !== genreList.length-1) {
                        filterOption+=" or ";
                    }
                }
                filterOption+=" )";
            }
        }
    }

    let searchOptions = {
        select: ["doc_id", "title", "author", "img"],   // The list of fields to retrieve
        skip: skip,                                     // The number of search results to skip. 
        top: top,                                       // The number of search results to retrieve.
        orderBy: orderByOption,                         // The list of OData $orderby expressions by which to sort the results. 
        filter: odata(filterOption)                     // The OData $filter expression to apply to the search query. 
    };

    // Perform a search on the current index given the specified arguments.
    let searchResults = await searchClient.search(searchString, searchOptions);

    // Get the list of books from the search result
    let books = [];
    
    for await (const result of searchResults.results) {
        books.push(result.document);
    }
    return books;
}
export default searchBooks
export {searchBooks}