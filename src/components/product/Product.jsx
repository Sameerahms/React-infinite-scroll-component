import React, { useState, useEffect } from "react";
import "./product.css";
import InfiniteScroll from "react-infinite-scroll-component";

import { products } from "../../constants";

const ProductCard = ({ name, price, quantity, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleMouseEnter = () => {
    // Rotate to the next image
    const id = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    setIntervalId(id);
  };

  const handleMouseLeave = () => {
    // Reset to the first image when mouse leaves
    setCurrentImageIndex(0);
    clearInterval(intervalId);
  };

  return (
    <div className="product_item">
      <img
        src={images[currentImageIndex]}
        alt="me"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <div className="product-name">{name}</div>
      <div className="product-info">
        <div className="product-price">Price: ${price}</div>
        <div className="product-quantity">Quantity: {quantity}</div>
      </div>
    </div>
  );
};

const Product = () => {
  const [productItems, setProductItems] = useState([]);
  const [page, setPage] = useState(3);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    //Load initial 8 products
    const initialProducts = products.slice(0, 8);
    setProductItems([...initialProducts]);
  }, []);

  const fetchData = () => {
    console.log("ooo");
    // API call Simulating using TimeOut
    setTimeout(() => {
      const startIndex = (page - 1) * 4;
      const newProducts = products.slice(startIndex, startIndex + 4);

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProductItems((prevProduct) => [...prevProduct, ...newProducts]);
        setPage((prevPage) => prevPage + 1);
      }
    }, 500);
  };

  return (
    <div className="container">
      <h1>Products List</h1>

      <InfiniteScroll
        dataLength={productItems.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>That's all for now! Check back later for more.</b>
          </p>
        }
      >
        <div className="product_container">
          {productItems.map((productItem, index) => (
            <ProductCard
              key={index}
              name={productItem.name}
              price={productItem.price}
              quantity={productItem.quantity}
              images={productItem.images}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Product;
