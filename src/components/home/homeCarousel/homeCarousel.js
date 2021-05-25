import React from 'react'
import { Carousel } from 'primereact/carousel';

// This is just for fun =)
const HomeCarousel = (props) => {
    // const responsiveOptions = [
        
    //     {
    //         breakpoint: '480px',
    //         numVisible: 1,
    //         numScroll: 1
    //     }
    // ];
    const images = props.images;
    function itemTemplate(imageURL) {
        return(
            <div className="product-item">
                <div className="product-item-content">
                    <div className="p-mb-3">
                        <img src={imageURL} alt={imageURL} className="product-image pt-auto" />
                    </div>
                </div>
            </div>
        )
    }

    
    return(
        <div className="content-section">
            <div className="card">
                <Carousel value={images} numVisible={1} numScroll={1} itemTemplate={itemTemplate} autoplayInterval={4000} circular />
            </div>
        </div>  
    )
}

export default HomeCarousel