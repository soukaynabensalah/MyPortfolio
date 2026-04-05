import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [hasMouse, setHasMouse] = useState(false);

  useEffect(() => {
    // Only show custom cursor on devices with a mouse (not touch)
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHasMouse(mq.matches);

    const handleChange = (e) => setHasMouse(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!hasMouse) return;

    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [hasMouse]);

  // Don't render cursor elements on touch devices
  if (!hasMouse) return null;

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
