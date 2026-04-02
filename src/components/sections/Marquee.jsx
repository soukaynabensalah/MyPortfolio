import { marqueeItems } from "../../data/portfolio";

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee__track">
        {[...Array(2)].map((_, i) => (
          <span key={i} className="marquee__group">
            {marqueeItems.map((text, j) => (
              <span
                key={j}
                className={`marquee__item ${text === "◈" ? "marquee__item--accent" : ""}`}
              >
                {text}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
