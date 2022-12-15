import React from "react";
// A simple image element. Pass in src for the image source, alt for the alternative description and attr for class based css design.
// e.g. Bulma or Bootstrap.

function Image({ src, attr, alt }) {
  return <img src={src} alt={alt} className={attr} />;
}

export default Image;
