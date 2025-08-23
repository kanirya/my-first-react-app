import React from 'react'

const Search = ({searchTerm,setSearchTerm}) => {
    return (
        <div className="search">
            <div>
                <img src="/search.svg" alt= "Hero Banner" />
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search..."
                onChange={(event) => setSearchTerm(event.target.value)}/>
            </div>
        </div>
    )
}
export default Search
