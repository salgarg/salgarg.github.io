import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import digart1 from "../../Assets/DigitalArtFiles/IMG_0198.PNG";
import digart2 from "../../Assets/DigitalArtFiles/IMG_0199.PNG";
import digart3 from "../../Assets/DigitalArtFiles/IMG_0203.PNG";
import digart4 from "../../Assets/DigitalArtFiles/IMG_0204.PNG";
import digart5 from "../../Assets/DigitalArtFiles/IMG_0205.PNG";
import digart6 from "../../Assets/DigitalArtFiles/IMG_0206.PNG";
import digart7 from "../../Assets/DigitalArtFiles/IMG_0208.PNG";
import digart8 from "../../Assets/DigitalArtFiles/IMG_0209.PNG";
import digart9 from "../../Assets/DigitalArtFiles/IMG_0216.PNG";
import digart10 from "../../Assets/DigitalArtFiles/IMG_0219.PNG";

function DigitalArtGallery() {
  const photos = [digart10,digart9, digart8, digart7, digart3, digart1, digart2, digart5, digart6, digart4];

  return (
    <div className="photography-container">
      <h2 className="coming-soon-title">Check Out Some of My Digital Art!</h2>
      <Swiper
        modules={[EffectCoverflow, Navigation, Pagination]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        initialSlide={1}
        coverflowEffect={{
          rotate: 30,
          stretch: 10,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        breakpoints={{
          1200: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          },
        }}
      >
        {photos.map((photo, index) => (
          <SwiperSlide
            key={index}
            style={{
              background: `url(${photo}) no-repeat center center/cover`,
              height: "300px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          ></SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default DigitalArtGallery;
