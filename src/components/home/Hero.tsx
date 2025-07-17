"use client";
const Hero = () => {
  return (
    <>
      <section className="hero">
        <h1>The Lifecar Auto Tuning</h1>
        <p>
          Chip tuning, audio sistemalar, detailing, tanirofka, gps, va boshqalar – barchasi bir
          joyda.
        </p>
        <video
          src="/videos/heroVideo.mp4"
          width={"100%"}
          height={"100%"}
          autoPlay
          loop
          muted
        ></video>
      </section>
    </>
  );
};

export default Hero;
