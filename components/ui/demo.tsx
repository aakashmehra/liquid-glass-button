"use client";

/**
 * Liquid Glass Home. Designed & built by Aakash Mehra.
 * Drag the pill anywhere. Tap it and it finds its way home.
 */

import { LiquidGlass } from "./liquid-glass";
import { Home } from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";

// Bevel is capped at H/2, so keep it near that for a strong rim bend.
const W = 184;
const H = 68;

export default function LiquidGlassHome() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dragged = useRef(false);

  const goHome = () => {
    // Only an explicit tap sends it home; letting go after a drag never does.
    if (dragged.current) return;
    const spring = reduceMotion
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 260, damping: 22 };
    animate(x, 0, spring);
    animate(y, 0, spring);
  };

  return (
    <div
      ref={constraintsRef}
      className="relative h-dvh w-full overflow-hidden bg-neutral-950 font-sans text-white"
    >
      <Scene />

      <motion.button
        type="button"
        aria-label="Home"
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        whileDrag={reduceMotion ? undefined : { scale: 1.06 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        onPointerDown={() => (dragged.current = false)}
        onDragStart={() => (dragged.current = true)}
        onTap={goHome}
        className="absolute top-1/2 left-1/2 cursor-grab touch-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/80 active:cursor-grabbing"
        style={{
          x,
          y,
          width: W,
          height: H,
          marginLeft: -W / 2,
          marginTop: -H / 2,
        }}
      >
        <LiquidGlass
          radius={H / 2}
          scale={48}
          aberration={14}
          bevelDepth={30}
          frost={0.4}
          tint={0.12}
          className="size-full shadow-[0_12px_40px_rgb(0_0_0/0.25),inset_0_1px_0_rgb(255_255_255/0.5)]"
          contentClassName="relative flex size-full items-center justify-center gap-2 text-xl font-semibold tracking-tight text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.35)] select-none"
        >
          <Home className="size-5" strokeWidth={2.25} />
          Home
        </LiquidGlass>
      </motion.button>
    </div>
  );
}

/** Background, headline and corners. */
function Scene() {
  return (
    <>
      <picture>
        <source
          media="(orientation: portrait)"
          srcSet="/home-bg-portrait.webp"
        />
        <img
          src="/home-bg-landscape.webp"
          alt=""
          className="absolute inset-0 size-full object-cover"
          draggable={false}
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/70" />
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 select-none md:p-10">
        <header className="flex items-center justify-between text-sm font-medium tracking-tight">
          <span>Aakash Mehra</span>
          <span className="text-white/60">Liquid Glass</span>
        </header>

        {/* Lines sit either side of the pill's home spot (screen centre); letter
          edges tuck under its rim but stay clear of "Home". Offsets in px from centre. */}
        <h1 className="absolute inset-0 text-center text-4xl leading-[0.95] font-semibold tracking-[-0.04em] md:text-6xl">
          <span className="absolute bottom-[calc(50%+24px)] left-1/2 -translate-x-1/2 whitespace-nowrap">
            Light, poured
          </span>
          <span className="absolute top-[calc(50%+20px)] left-1/2 -translate-x-1/2 whitespace-nowrap md:top-[calc(50%+10px)]">
            into glass.
            <span className="absolute top-full left-1/2 mt-4 -translate-x-1/2 text-sm font-normal tracking-tight whitespace-nowrap text-white/75 md:text-base">
              by{" "}
              <a
                href="https://aakashmehra.com/ref/liquidglass"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto font-medium text-white underline-offset-4 hover:underline"
              >
                aakashmehra.com
              </a>
            </span>
          </span>
        </h1>

        <footer className="flex items-end justify-between gap-6 text-sm tracking-tight text-white/70">
          <p className="max-w-56">
            Drag the glass anywhere.
            <br />
            Tap it to send it home.
          </p>
          <span>© 2026 Aakash Mehra</span>
        </footer>
      </div>{" "}
    </>
  );
}
