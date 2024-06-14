import React, { useContext, useState } from 'react';
import { myContext } from './App';
import './style/Card.css';
import { Carousel } from 'react-bootstrap'; // Import Carousel from react-bootstrap
import { BsStarFill } from 'react-icons/bs';
import { BiPlus, BiMinus } from 'react-icons/bi';


const CardComp = () => {
    const [data, setData] = useContext(myContext);
    const [cartStatus, SetCartStatus] = useState(false);
    const cartAdd = () => {
        SetCartStatus(true);
    };
    const cartRemove = (id) => {
        setData(predata => predata.filter(item => item.id !== id));
    };

    const HandleIncrease = (id, quantity) => {
        setData(preval => {
            return preval.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: (item.quantity + 1 || quantity + 1) };
                }
                return item;
            });
        });
    };
    const HandleDecrease = (id, quantity) => {
        setData(pval => {
            return pval.map((item) => {
                if (item.id === id && (item.quantity || quantity) > 1) {
                    return { ...item, quantity: (item.quantity - 1 || quantity - 1) };
                }
                return item;
            });
        });
    };

    return (
        <div>
            {data.map((item, index) => {
                return (
                    <div key={index} style={{ margin: "2em 0em" }}>
                        <div className="card p-5 mb-5 " id='card-w'>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <div>
                                        {/* Carousel for multiple images */}
                                        <Carousel id={`carouselExample${index}`}>
                                            {/* Mapping through item images */}
                                            {item.images.map((image, i) => (
                                                <Carousel.Item key={i}>
                                                    <img src={image} className="d-block w-100" alt={`Slide ${i}`} id='carousel-img'/>
                                                </Carousel.Item>
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        {/* Title and price */}
                                        <div className="d-flex justify-content-between">
                                            <h4 className="card-title w-50">{item.title}</h4>
                                            <h4 className="card-title">${item.price}</h4>
                                        </div>
                                        {/* Description, brand, and stock */}
                                        <div className="w-50">
                                            <p className="card-text">{item.description}</p>
                                            <p className="card-text"><b>Brand:</b> {item.brand}</p>
                                            <p className="card-text" style={{ color: "red" }}><span className='stock'> In Stock: {item.stock}</span></p>
                                        </div>
                                        {/* Rating and quantity control */}
                                        <div className="d-flex justify-content-between ">
                                            <p className="card-text"> <b>Rating: {item.rating}</b></p>
                                            <div className="d-flex align-items-center">
                                                <button className="mx-2 quantity-btn p-2" onClick={() => HandleIncrease(item.id, item.quantity || 1)}><BiPlus /></button>
                                                <h6 className="mx-2">{item.quantity || 1}</h6>
                                                <button className="mx-2 quantity-btn p-2" onClick={() => HandleDecrease(item.id, item.quantity || 1)}><BiMinus /></button>
                                            </div>
                                        </div>
                                        {/* Star rating */}
                                        <div className="text-warning mb-2 small">
                                        <BsStarFill />
                                                <BsStarFill />
                                                <BsStarFill />
                                                <BsStarFill />
                                                <BsStarFill />
                                        </div>
                                        {/* Last updated time */}
                                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                        {/* Button to remove item from cart */}
                                        <div className="d-flex justify-content-end" id="btn-div">
                                            <button className="btn btn-danger" id="btn" onClick={() => cartRemove(item.id)} >Remove from Cart</button>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardComp;