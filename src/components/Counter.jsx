// Counter.jsx - Version avec countup.js
import { useEffect, useRef } from "react";
import { CountUp } from "countup.js";

export const Counter = ({ target, suffix = "", duration = 2000 }) => {
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);
  const countUpRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          countUpRef.current = new CountUp(elementRef.current, Number(target), {
            duration: duration / 1000,
            suffix: suffix,
            useEasing: true,
            useGrouping: false,
          });

          if (!countUpRef.current.error) {
            countUpRef.current.start();
          } else {
            console.error(countUpRef.current.error);
          }

          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      if (countUpRef.current) {
        countUpRef.current.reset();
      }
    };
  }, [target, duration, suffix]);

  return (
    <span ref={elementRef} className="inline-block">
      0{suffix}
    </span>
  );
};
