"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useTheme } from "next-themes";

export default function FramerSpotlight() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMouseInHero, setIsMouseInHero] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const defaultPositionRef = useRef({ x: 0, y: 0 });
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  const spotlightColors = [
    { color: "rgba(36, 101, 237, 0.2)", darkColor: "rgba(36, 101, 237, 0.25)" },
    { color: "rgba(236, 72, 153, 0.15)", darkColor: "rgba(236, 72, 153, 0.2)" },
    { color: "rgba(16, 185, 129, 0.15)", darkColor: "rgba(16, 185, 129, 0.2)" },
  ];

  const updateDefaultPosition = useCallback(() => {
    if (heroRef.current) {
      const heroRect = heroRef.current.getBoundingClientRect();
      const centerX = heroRect.left + heroRect.width / 2;
      const centerY = heroRect.top + heroRect.height / 3;

      defaultPositionRef.current = { x: centerX, y: centerY };
      mouseX.set(centerX);
      mouseY.set(centerY);
    }
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => {
    setIsMouseInHero(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseInHero(false);

    animate(mouseX, defaultPositionRef.current.x, {
      duration: 1.2,
      ease: "easeInOut",
    });

    animate(mouseY, defaultPositionRef.current.y, {
      duration: 1.2,
      ease: "easeInOut",
    });
  }, [mouseX, mouseY]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMouseInHero) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    },
    [isMouseInHero, mouseX, mouseY]
  );

  useEffect(() => {
    setIsMounted(true);
    heroRef.current = document.getElementById("hero");

    updateDefaultPosition();

    window.addEventListener("resize", updateDefaultPosition);
    window.addEventListener("mousemove", handleMouseMove);

    if (heroRef.current) {
      heroRef.current.addEventListener("mouseenter", handleMouseEnter);
      heroRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("resize", updateDefaultPosition);
      window.removeEventListener("mousemove", handleMouseMove);

      if (heroRef.current) {
        heroRef.current.removeEventListener("mouseenter", handleMouseEnter);
        heroRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [updateDefaultPosition, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  if (!isMounted) {
    return null;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${
            isDark ? spotlightColors[0].darkColor : spotlightColors[0].color
          } 0%, transparent 70%)`,
          width: "1000px",
          height: "1000px",
          borderRadius: "50%",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          x: ["0%", "10%", "5%", "0%"],
          y: ["0%", "5%", "10%", "0%"],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          background: `radial-gradient(circle, ${
            isDark ? spotlightColors[1].darkColor : spotlightColors[1].color
          } 0%, transparent 70%)`,
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          left: "20%",
          top: "30%",
        }}
      />

      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          x: ["0%", "-10%", "-5%", "0%"],
          y: ["0%", "-5%", "-10%", "0%"],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          background: `radial-gradient(circle, ${
            isDark ? spotlightColors[2].darkColor : spotlightColors[2].color
          } 0%, transparent 70%)`,
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          right: "20%",
          bottom: "30%",
        }}
      />

      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          background: `radial-gradient(circle, ${
            isDark ? "rgba(168, 85, 247, 0.2)" : "rgba(168, 85, 247, 0.15)"
          } 0%, transparent 70%)`,
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          left: "60%",
          top: "20%",
        }}
      />

      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
        style={{
          background: `radial-gradient(circle, ${
            isDark ? "rgba(251, 191, 36, 0.2)" : "rgba(251, 191, 36, 0.15)"
          } 0%, transparent 70%)`,
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          left: "30%",
          bottom: "15%",
        }}
      />
    </div>
  );
}
