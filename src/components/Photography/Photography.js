import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import alaska1 from "../../Assets/PhotographyPhotos/alaska1.JPG";
import india1 from  "../../Assets/PhotographyPhotos/india1.JPG";
import alaska2 from "../../Assets/PhotographyPhotos/alaska2.JPG";
import india2 from "../../Assets/PhotographyPhotos/india2.JPG";
import alaska3 from "../../Assets/PhotographyPhotos/alaska3.JPG";
import india3 from "../../Assets/PhotographyPhotos/india3.JPG";
import alaska5 from "../../Assets/PhotographyPhotos/alaska5.jpg";

function Photography() {
  const photos = [alaska1,india1,alaska2,india2,alaska3,india3,alaska5];

  return (
    <div className="photography-container">
      <h2 className="coming-soon-title">Check Out Some of My Photos!</h2>
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

export default Photography;
