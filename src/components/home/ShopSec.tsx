import React from "react";

import Image from "next/image";

const shopItems = [
  {
    img: "/img/malibu.png",
    title: "Chevrolet Malibu 2 steering wheel",
    description:
      "This steering wheel is a replica of the original steering wheel of the Chevrolet Malibu 2018-2025. It is made of high quality materials and is designed to fit perfectly in your car.",
    price: "$100",
  },
  {
    img: "/img/zimmer.png",
    title: "LED Zimmer E8 PRO H4",
    description:
      "This LED Zimmer E8 PRO H4 is a high quality LED light that is designed to fit perfectly in your car.",
    price: "$100",
  },
  {
    img: "/img/7700.png",
    title: "NEOLINE X-COP 7700s Black",
    description: "Signature radar detector with dual signal amplifier",
    price: "$100",
  },
];

const ShopSec = () => {
  return (
    <section className="ShopSec">
      <div className="container">
        <div className="ShopSec-header">
          <div className="left">
            <h2 className="ShopSec-title">Shop Car Tuning Parts</h2>
            <p className="ShopSec-description">
              We offer a wide range of car tuning parts for all makes and
              models.
            </p>
          </div>

          <button className="ShopSec-button primary-btn">
            <span>See all products</span>
          </button>
        </div>
        <div className="shop-cards">
          {shopItems.map((item, idx) => (
            <div className="shop-card" key={idx}>
              <Image src={item.img} alt={item.title} width={400} height={400} />
              <div className="card-content">
                <div className="top">
                  <div className="title">{item.title}</div>
                  <div className="description">{item.description}</div>
                </div>
                <div className="bottom">
                  <h5 className="price">{item.price}</h5>
                  <button className="primary-btn">More info</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopSec;
