import { useState } from 'react'
import './App.css'


function App() {
  const [movie, setMovie] = useState('');
  const [results, setResults] = useState({});
  function handleChange(e){
    setMovie(e.target.value);
  }
  async function searchMovies(){
    try{
    const response  = await fetch(`https://www.omdbapi.com/?apikey=d1fd5a42&t=${movie}`)
       if(!response.ok){
          throw new Error("Network response was not ok!");
       }
       const data = await response.json();
       console.log(data);
       setResults(data);
    } catch(error){
      console.error("Error fetching data: ", error);
    }
    setMovie('');
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white">
       <h1 className="text-4xl font-bold mb-8">Movie Search App</h1>
       <div className="w-full max-w-md">
      <input value={movie}
      className="w-full p-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-pink-500 mb-4"
      onChange={handleChange}
      placeholder='Search for Movies'></input>
      <button className="w-full bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-lg"
       onClick={searchMovies}>Search</button>
       </div>
      <div className="w-full max-w-md mt-8">
      {results.Title && (  // Conditional rendering
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold mb-4">{results.Title}</h1>
                <p><strong>Released:</strong> {results.Released}</p>
                <p><strong>Plot:</strong> {results.Plot}</p>
                <p><strong>Actors: </strong>{results.Actors}</p>
                <p><strong>Genre:</strong> {results.Genre}</p>
              </div>
        )}
      </div>
    </div>
  )
}

export default App;
