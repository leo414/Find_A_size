import React from 'react'

const Search = () => (
  <section className="search container">
    <div className="title">
      <h1>Looking for a furniture? Never by full priced furnitures!</h1>
      <p>Watch the price drop and save on the best price ever!</p>
    </div>

    <div className="search">
      <input className="in_block" type="text" placeholder="Search" />
      <span className="search_icon in_block"><i className="sousuo" /></span>
    </div>
    <small className="small">Example: industrial coffee table</small>
  </section>
)

export default Search
