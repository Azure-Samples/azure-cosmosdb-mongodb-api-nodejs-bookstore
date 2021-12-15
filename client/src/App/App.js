import React from 'react';
import { Routes } from './Routes';
import { NavBar } from './NavBar';
import { useNavbarFilters } from './useNavbarFilters';

function App() {
  const {rating, setRating, format, setFormat, searchText, setSearchText, genre, setGenre} = useNavbarFilters();

  const handleRating = (ratinginput) => {
      setRating((oldrating) => {
        if (oldrating === ratinginput) {
          return "0";
        }
        else return ratinginput;
      });
  }

  const handleFormat = (formatinput) => {
      setFormat((oldFormatInput) => {
        if (oldFormatInput === "") {
          return formatinput;
        } else  {
            const oldFormatList = Array.isArray(oldFormatInput) ? oldFormatInput : oldFormatInput.split(",");
            if (oldFormatList.includes(formatinput)) {
              var index = oldFormatList.indexOf(formatinput);
              if (index > -1) {
                oldFormatList.splice(index, 1);
              }
              return oldFormatList === [] ? "" : oldFormatList.join();
            }
            else {
              return oldFormatInput + "," + formatinput;
            }
          }
        }
      );
  }

  const handleGenre = (genreinput) => {
    setGenre((oldGenreInput) => {
      if (oldGenreInput === "") {
        return genreinput;
      } else  {
          const oldGenreList = Array.isArray(oldGenreInput) ? oldGenreInput : oldGenreInput.split(",");
          if (oldGenreList.includes(genreinput)) {
            var index = oldGenreList.indexOf(genreinput);
            if (index > -1) {
              oldGenreList.splice(index, 1);
            }
            return oldGenreList === [] ? "" : oldGenreList.join();
          }
          else {
            return oldGenreInput + "," + genreinput;
          }
        }
      }
    );
  }

  const handleSearch = (searchTextInput) => {
    setSearchText(searchTextInput);
  }

  return (
    <main className="wrapper">
      <NavBar rating={rating} format={format} genre={genre} handleRating={(input)=> handleRating(input)} handleFormat={(e)=>handleFormat(e)} handleSearch={(input)=>handleSearch(input)} handleGenre={(e)=>handleGenre(e)}/>
      <Routes rating={rating} format={format} genre={genre} searchText={searchText}/>
    </main>
  );
}

export default App;
