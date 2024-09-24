import React from "react";
import img1 from "./assets/2.png";
import img2 from "./assets/3.png";
// import LazyLoad from "react-lazyload";
import LazyLoad from "./MyLazyLoad";


const LazyGuang = React.lazy(() => import('./Guang'));


export default function App() {
  return (
    <div>

      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <LazyLoad placeholder={<div>loading...</div>}>
        {/* <img src={img1} /> */}
        <LazyGuang />
      </LazyLoad>
      <LazyLoad placeholder={<div>loading...</div>} /* offset={300} */>
        <img src={img2} />
      </LazyLoad>
    </div>
  );
}
