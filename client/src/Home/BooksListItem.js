import React from 'react';

export const BooksListItem = ({ book }) => {

    const title = (book.title.length < 75 ) ? book.title : (book.title.substring(0, 75) + '...');
    const author = book.author.length < 100 ? book.author : book.author.substring(0,100) + '...';
    const bookId = book._id ? book._id : book.doc_id;

    let myStyle;
    let titleTextImg;
    if (book.img !== "") {
        const imageUrl = book.img;
        myStyle = {backgroundImage: 'url(' + imageUrl + ')', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '450px', borderRadius: '1rem'};
        titleTextImg = "";
    } else {
        const imageUrl = "../bookcover.png";
        myStyle = {backgroundImage: 'url(' + imageUrl + ')', 
                    backgroundPosition: 'center', 
                    backgroundSize: 'cover', 
                    backgroundRepeat: 'no-repeat', 
                    height: '450px', 
                    borderRadius: '1rem',
                    textAlign: "center",
                    fontSize: "30px",
                    color: "black",
                    lineHeight: "80px",
                    fontWeight: "500",
                    textTransform: "uppercase",
                    };
        titleTextImg = title;
    }



    return (<li>
        <a href={"/book/" + bookId} target="_blank" rel="noopener noreferrer">
        <div className="item" style={myStyle}>{titleTextImg}
            <div className="item-overlay">
                <div className="book-title">{title}</div>
                <div className="book-author">By {author}</div>
            </div>
        </div>
        
        </a>
    </li>);

};