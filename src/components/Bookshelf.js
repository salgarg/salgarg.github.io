import React, {useEffect, useRef, useCallback } from "react";
import { Container, Row } from "react-bootstrap";
import SidebarNav from "./SidebarNav";
import previousCover from "../Assets/Books/daisyjones.jpg";
import nowCover from "../Assets/Books/exceptional.jpg";
import nextCover from "../Assets/Books/yellowface.jpg";

function Bookshelf() {
  const rowRef = useRef(null);

  const center = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  useEffect(() => {
    // center once the component paints
    requestAnimationFrame(center);

    // re-center when the window resizes
    window.addEventListener("resize", center);
    return () => window.removeEventListener("resize", center);
  }, [center]);

  const handleImgLoad = () => center();

  return (
    <>
      <SidebarNav />
      <Container className="bookshelf">
        <div className="book-row" ref={rowRef}>
          <div className="book">
            <h3 className="book-status-title">previous</h3>
            <img src={previousCover} alt="Previous Book" onLoad={handleImgLoad} />
          </div>
          <div className="book">
            <h3 className="book-status-title">now</h3>
            <img src={nowCover} alt="Now Reading" onLoad={handleImgLoad} />
          </div>
          <div className="book">
            <h3 className="book-status-title">next</h3>
            <img src={nextCover} alt="Next Book" onLoad={handleImgLoad} />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Bookshelf;
