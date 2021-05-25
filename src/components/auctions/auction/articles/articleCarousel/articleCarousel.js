import React from 'react'
import { Carousel } from 'primereact/carousel';
import './articleCarousel.css'
import ArticleCard from '../articleCard/articleCard';


const ArticleCarousel = (props) => {
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    const articles = props.articles;
    function itemTemplate(article) {
        return(
            <ArticleCard article={article}/>
            // <div className="product-item">
            //     <div className="product-item-content">
            //         <div className="p-mb-3">
            //             <img src={article.photoURL} alt={article.name} className="product-image carouselImg" />
            //         </div>
            //         <div>
            //             <h4 className="p-mb-1">{article.title}</h4>
            //             <h6 className="p-mt-0 p-mb-3">{article.estimation} €</h6>
            //         </div>
            //     </div>
            // </div>
        )
    }

    
    return(
        <div className="content-section">
            <div className="card">
                <Carousel value={articles} numVisible={4} numScroll={1} itemTemplate={itemTemplate} autoplayInterval={3000} responsiveOptions={responsiveOptions} circular header={<div className="text-center my-4"><h1>Other articles</h1></div> }/>
            </div>
        </div>  
    )
}

export default ArticleCarousel