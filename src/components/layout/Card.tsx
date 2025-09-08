const Card = (props: {
  img: string;
  title: string;
  desc: string;
  price: string;
  time: string;
  layout: string;
  type: string;
}) => {
  const { img, title, desc, price, time, layout, type } = props;
  return (
    <>
      <div className={`card ${layout}`}>
        <div className="card-type">{type}</div>
        <div className="img-wrapper">
          <img src={img} alt={title} />
        </div>
        <div className="card-content">
          <h4 className="title">{title}</h4>
          <p className="desc">{desc}</p>
          <div className="card-bottom">
            <h4 className="price">{price}</h4>
            <h4 className="time">{time}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
