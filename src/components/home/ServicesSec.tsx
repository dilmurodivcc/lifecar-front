const services = [
  {
    img: "/img/tint.webp",
    title: "Tanirofka Pro",
    desc: "Avtomobil oynalarini professional qoraytirish xizmati.",
    price: "100$",
  },
  {
    img: "/img/tint.webp",
    title: "Audio Tizim Plus",
    desc: "Sifatli audio tizimlar o‘rnatish va sozlash.",
    price: "150$",
  },
  {
    img: "/img/tint.webp",
    title: "GPS Kuzatuv",
    desc: "Avtomobil uchun zamonaviy GPS kuzatuv tizimi.",
    price: "80$",
  },
  {
    img: "/img/tint.webp",
    title: "Keramik Qoplama",
    desc: "Uzoq muddatli himoya va yorqinlik uchun.",
    price: "300$",
  },
  {
    img: "/img/tint.webp",
    title: "Shovqin Izolyatsiyasi",
    desc: "Salondagi shovqinni kamaytirish.",
    price: "250$",
  },
  {
    img: "/img/tint.webp",
    title: "Signalizatsiya",
    desc: "Eng so'nggi rusmdagi avtomobil signalizatsiyalari.",
    price: "180$",
  },
  {
    img: "/img/tint.webp",
    title: "Ximchistka",
    desc: "Salonni to'liq kimyoviy tozalash.",
    price: "120$",
  },
  {
    img: "/img/tint.webp",
    title: "Polirovka",
    desc: "Kuzovni yaltiratish va mayda chiziqlarni yo'qotish.",
    price: "160$",
  },
  {
    img: "/img/tint.webp",
    title: "Motor Diagnostikasi",
    desc: "Dvigatelni to'liq kompyuter diagnostikasi.",
    price: "40$",
  },
  {
    img: "/img/tint.webp",
    title: "Faralarni Sozlash",
    desc: "Faralarni to'g'ri sozlash va yoritishini yaxshilash.",
    price: "30$",
  },
  {
    img: "/img/tint.webp",
    title: "Konditsioner Tozalash",
    desc: "Konditsioner sistemasini tozalash va to'ldirish.",
    price: "50$",
  },
  {
    img: "/img/tint.webp",
    title: "Shinalarni Almashtirish",
    desc: "Mavsumiy shinalarni o'rnatish va balansirovka.",
    price: "20$",
  },
  {
    img: "/img/tint.webp",
    title: "Tormoz Tizimi",
    desc: "Tormoz tizimini tekshirish va ta'mirlash.",
    price: "70$",
  },
  {
    img: "/img/tint.webp",
    title: "Elektronika",
    desc: "Avtoelektronika bilan bog'liq muammolarni bartaraf etish.",
    price: "90$",
  },
  {
    img: "/img/tint.webp",
    title: "Kuzov Ta'miri",
    desc: "Kichik avariya sonrası kuzovni tiklash.",
    price: "400$",
  },
];

const ServicesSec = () => {
  const numColumns = 5;
  const columns = Array.from({ length: numColumns }, (): typeof services => []);
  services.forEach((service, i) => {
    columns[i % numColumns].push(service);
  });

  return (
    <section className="SevicesSec">
      <div className="container">
        <h2 className="section-title">Bizning Xizmatlar</h2>
        <div className="services-carousel-wrapper">
          <div className="services-carousel">
            {columns.map((column, colIndex) => (
              <div className="carousel-column" key={colIndex}>
                {[...column, ...column].map((service, cardIndex) => (
                  <div className="card" key={cardIndex}>
                    <img src={service.img} alt={service.title} />
                    <div className="card-content">
                      <h4 className="title">{service.title}</h4>
                      <div className="card-bottom">
                        <p className="description">{service.desc}</p>
                        <h4 className="price">{service.price}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="carousel-fade"></div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSec;
