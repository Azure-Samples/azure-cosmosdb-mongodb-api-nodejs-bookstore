import React from 'react';
import { useParams } from 'react-router-dom';
import { useBook } from './useBook';
import { Rating } from "./Rating";
import { Genres } from "./Genres";
import { updateComment } from "./updateComment";
import { useRef } from 'react';
import { removeComment } from "./removeComment";

export const BookPage = () => {
    const { id } = useParams();
    const {book} = useBook(`/books/${id}`);
    

    const image = book.img ? book.img : "../defaultcover.png";

    const commentList = book.reviewcomments;
    const commentListMap = commentList === undefined? <div></div> : commentList.map((entry, index) => {
        if (entry === null) {
            return (<div></div>);
        }
        else {
            return (
                <li className="comment-entry" key={index}>
                    <div className="comment-name-box">
                        <b className="comment-name">{entry.name}</b> says
                        <button className="remove-icon-btn remove-btn" onClick={() => handleDeleteComment(index)}>  
                            <div className="remove-btn-txt" >Remove</div>
                        </button>
                    </div>
                    <div className="comment-text">{entry.comment}</div>
                </li>
            )
        }
    });

    let nameInput = useRef(null);
    let commentInput = useRef(null);
    
    const handleUpdateComment = () => {
        if (nameInput.current.value === "" || commentInput.current.value === "") {
            alert("Name and comment text cannot be blank.");
        }
        else {
            updateComment(`/books/${id}/comments`, {"name": nameInput.current.value, "comment": commentInput.current.value});
            nameInput.current.value = "";
            commentInput.current.value = "";
        }
    }

    const handleDeleteComment = (index) =>{
        if (index !== undefined) {
            removeComment(`/books/${id}/comments/${index}`);
        }
    }


    return (
        <div className="book-page">
            <div className="book-img-and-metadata">
                <div className="book-img-container">
                    <img className="book-image" src={image} alt={"cover of the book "+book.title}></img>
                    {book.img === "" ? <div class="book-title">{(book.title.length < 100 ) ? book.title : (book.title.substring(0, 100) + '...')}</div> : <div />}
                </div>
                <div className="book-metadata">
                    <h1>{book.title}</h1>
                    <h2>By: {book.author}</h2>
                    <Rating rating={book.rating} totalratings={book.totalratings} />
                    <Genres genres={book.genre}/>
                    <div>
                        <h3>Summary:</h3>
                        {book.desc}
                    </div>
                    <div>
                        <b>Formats: &nbsp;</b> <i>{book.bookformat}</i>
                        <br />
                        <b>ISBN: &nbsp;</b> <i>{book.isbn}</i>
                    </div>
                </div>
            </div>
            <div className="comments-container">
                <h3>Comments:</h3>
                <ul className="comments-list">
                    {commentListMap}
                </ul>
                <div className="comment-input-box">
                    <input className="comment-input-name" type="text" placeholder="Your name..." id="name" ref={nameInput} autoComplete="off"/>
                    <textarea className="comment-input-text" type="text" placeholder="Add any comment..." id="comment" ref={commentInput} />
                    <div className="comment-button-div">
                        <button className="comment-button" id="add-comment" onClick={() => handleUpdateComment()}>Add a comment</button>
                    </div>
			    </div>
            </div>
        </div>
    );
}