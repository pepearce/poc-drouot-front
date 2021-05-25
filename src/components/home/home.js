import React from 'react'
import HomeCarousel from './homeCarousel/homeCarousel'
const images = [`${process.env.PUBLIC_URL}/images/DrouotHome2.jpg`,`${process.env.PUBLIC_URL}/images/DrouotHome3.jpg`]

// Just to have a home page
const Home = () => {
   return(
        <>
        <div className="text-center">
        <h1>Drouot</h1>
        <HomeCarousel images={images}/>
        </div>
        </>
    )
}

export default Home