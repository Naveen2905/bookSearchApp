import React, { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [sortType, setSortType] = useState('');

  useEffect(() => {

    const sortArray = type => {
      const types = {
        title: 'title',
        first_publish_year: 'first_publish_year',
      };
      const sortProperty = types[type];
      const sorted = [...data].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setData(sorted);
    };
    sortArray(sortType);
    // eslint-disable-next-line
  }, [sortType]);



  const getBooks = async (e) => {
    e.preventDefault()
    setLoading(true)
    let res = await axios(`http://openlibrary.org/search.json?title=${searchQuery}`)
    // eslint-disable-next-line
    setLoading(false)
    setData(res.data.docs)
  }


  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div>
      <header className='wrapper'>
        <h1>Book Search App</h1>
      </header>

      <main>
        <form className='formContainer' onSubmit={getBooks}>
          <input type="text" onChange={handleChange} />
          <button>Search</button>
        </form>


        <div className='wrapper dataContainer'>
          <select className='sort' onChange={(e) => setSortType(e.target.value)}>
            <option value="title">Title</option>
            <option value="first_publish_year">Publish Year</option>
          </select>
          {loading ? <p className='loading'> Loading...</p> : false}
          <ul>
            {data.map(function (n, i) {

              const id = n.cover_i
              const imgSrc = `https://covers.openlibrary.org/b/id/${id}-M.jpg`
              return (

                <li key={i} >
                  <img src={imgSrc} alt="" />
                  <h3><span className='heading'>Title: </span>{n.title}</h3>
                  <p><span className='heading'>Publish Year: </span>{n.first_publish_year}</p>
                  <p><span className='heading'>Author Name :</span>{n.author_name}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </main >
    </div >
  );
}

export default App;
