import React, { useState } from 'react'
import ArticleCard from './articleCard/articleCard'
import './SearchBar.css'



const Articles = (props) => {
    const [searchValue, setSearchValue] = useState("")

    const handleInputChange = (event) => {
        setSearchValue (event.target.value)
    }

    const handleClearClick = () => {
        setSearchValue("")
    }

    const articles = props.searchedList;
    console.log(articles)

    const filtered = articles.filter( (product) => {
        return product.title.toLowerCase().includes(searchValue.toLowerCase()) || product.description.toLowerCase().includes(searchValue.toLowerCase())
    })

    const shouldDisplayClearButton = searchValue.length > 0
    console.log(searchValue)
    
    return (
        <div className="container mx-auto text-center" >
            <div className="input-group mb-3">
                <input type="search" className="form-control" value={searchValue} onChange={handleInputChange} placeholder="Rechercher un objet"></input>                
                <div className="input-group-append">
                    {shouldDisplayClearButton && <button className="btn btn-outline-secondary" type="button" onClick={handleClearClick}>Clear</button>}
                </div>
            </div>
            <div className="row text-center">
            {filtered == null ? "Loading..." : filtered.map( (article) => {
                return(
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-3 " key={article.ID} >
                <ArticleCard article={article}/>
                </div>
                )})}
            </div>
        </div>
            
    )
}
export default Articles