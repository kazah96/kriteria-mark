import React from "react";
import cn from "classnames";
import style from "./style";

const colors = ["#81d394", "#9dc97f", "#bbc97f", "#c99a7f", "#c9817f"];

const generateStyle = ({ mark }) => {
  const color = colors[Math.trunc((1 - mark) * (colors.length - 1))];
  console.log(mark);

  return {
    backgroundColor: color,
  };
};

const Result = React.memo(({ items }) => (
  <div className={style.container}>
    <div className={style.header}>
      <div className={style.flex}>
        <div className={style.name}>Название</div>
        <div className={style.mark}>Оценка</div>
      </div>
    </div>
    {items.map(item => (
      <div
        className={cn(style.bar, style.flex)}
        style={generateStyle({ mark: item.mark })}
        key={item.name}
      >
        <div className={style.name}>{item.name}</div>
        <div className={style.mark}>{item.mark}</div>
      </div>
    ))}
    {items.length > 0 && <p className={style.helper}>Наилучшим вариантом является {items[0].name}</p>}
  </div>
));

export default Result;
