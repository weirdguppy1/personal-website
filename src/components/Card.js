import React from "react";

const Card = (props) => {
    const {img, children, title, link} = props
  return (
    <a target="_blank" href={link} className="w-full border-2 border-primary card bg-base-100 shadow-xl hover:bg-black transition duration-250 cursor-pointer">
      <figure>
        <img src={img} />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <p>{children}</p>
      </div>
    </a>
  );
};

export default Card;
