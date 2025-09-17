import Image from "next/image";

const Card = (props: {
  img: string;
  title: string;
  desc: string;
  price: string;
  time?: string;
  layout: string;
  type: string;
}) => {
  const { img, title, desc, price, time, layout, type } = props;

  // Validate and sanitize image URL
  const isValidImageUrl = (url: string) => {
    if (!url || typeof url !== "string") return false;
    return url.startsWith("http") || url.startsWith("/");
  };

  const imageSrc = isValidImageUrl(img) ? img : "/img/placeholder.jpg";

  return (
    <>
      <div className={`card ${layout}`}>
        <div className="card-type">{type}</div>
        <div className="img-wrapper">
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={200}
            onError={(e) => {
              // Fallback to placeholder on error
              e.currentTarget.src = "/img/placeholder.jpg";
            }}
          />
        </div>
        <div className="card-content">
          <h4 className="title">{title}</h4>
          <p className="desc">{desc}</p>
          <div className="card-bottom">
            <h4 className="price">{price}</h4>
            {time && <h4 className="time">{time}</h4>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
