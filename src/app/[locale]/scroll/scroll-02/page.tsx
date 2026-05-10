"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";
import "./common/style.css";

export default function ScrollSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const indexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    sectionsRef.current = Array.from(
      containerRef.current.querySelectorAll(".section")
    ) as HTMLElement[];

    const appear = (index: number) => {
      const el = sectionsRef.current[index]?.querySelector("h1");
      if (!el) return;

      animate(el, {
        opacity: 1,
        duration: 500,
        easing: "easeInOutQuad",
      });
    };

    const disappear = () => {
      const targets = sectionsRef.current
        .map((s) => s.querySelector("h1"))
        .filter(Boolean) as Element[];

      animate(targets, {
        opacity: 0,
        duration: 300,
        easing: "easeInOutQuad",
      });
    };

    const scrollTo = (next: number) => {
      if (
        isAnimatingRef.current ||
        next < 0 ||
        next >= sectionsRef.current.length
      )
        return;

      isAnimatingRef.current = true;
      disappear();

      animate(containerRef.current!, {
        translateY: -next * window.innerHeight,
        duration: 1000,
        easing: "easeInOutQuad",
        complete: () => {
          appear(next);
          indexRef.current = next;
          isAnimatingRef.current = false;
        },
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) scrollTo(indexRef.current + 1);
      else scrollTo(indexRef.current - 1);
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    // show section đầu tiên
    appear(0);

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="scroll-wrapper">
      <div className="sections" ref={containerRef}>
        <section className="section purple bg-amber-200!    ">
          <h1>Animejs plugins</h1>
        </section>
        <section className="section green bg-red-300!">
          <h1 className="purple-text">Animejs plugins</h1>
        </section>
        <section className="section creme bg-yellow-600!">
          <h1>Animejs plugins</h1>
        </section>
      </div>
    </div>
  );
}
