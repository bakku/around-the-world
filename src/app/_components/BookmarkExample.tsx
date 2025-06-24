"use client";

import {
  Check,
  Clipboard,
  MousePointer2,
  MousePointerClick,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function BookmarkExample() {
  const mousePointer = useRef<SVGSVGElement>(null);

  const [styleRight, setStyleRight] = useState(-80);
  const [styleBottom, setStyleBottom] = useState(0);
  const [roundsForClick, setRoundsForClick] = useState(0);
  const [showClick, setShowClick] = useState(false);
  const [roundsForButtonSwitch, setRoundsForButtonSwitch] = useState(0);
  const [buttonSwitched, setButtonSwitched] = useState(false);
  const [roundsForReset, setRoundsForReset] = useState(0);

  function animate() {
    if (styleBottom <= 30) {
      setStyleBottom((prevState) => prevState + 1);
      return;
    }

    if (styleRight <= -50) {
      setStyleRight((prevState) => prevState + 1);
      return;
    }

    if (roundsForClick <= 30) {
      setRoundsForClick((prevState) => prevState + 1);
      return;
    }

    if (!showClick && !buttonSwitched) {
      setShowClick(true);
      return;
    }

    if (roundsForButtonSwitch <= 5) {
      setRoundsForButtonSwitch((prevState) => prevState + 1);
      return;
    }

    if (!buttonSwitched) {
      setShowClick(false);
      setButtonSwitched(true);
      return;
    }

    if (roundsForReset <= 300) {
      setRoundsForReset((prevState) => prevState + 1);
      return;
    }

    // Reset animation.
    setStyleRight(-80);
    setStyleBottom(0);
    setRoundsForClick(0);
    setShowClick(false);
    setRoundsForButtonSwitch(0);
    setButtonSwitched(false);
    setRoundsForReset(0);
  }

  useEffect(() => {
    const interval = setInterval(() => animate(), 20);

    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
      <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs dark:bg-input/30 dark:border-input h-9 px-4 py-2 has-[>svg]:px-3">
        {!buttonSwitched ? (
          <>
            <Clipboard /> Copy link
          </>
        ) : (
          <>
            <Check /> Copied!
          </>
        )}
      </div>

      <MousePointer2
        ref={mousePointer}
        className="relative"
        style={{
          right: `${styleRight}px`,
          bottom: `${styleBottom}px`,
          display: !showClick ? "block" : "none",
        }}
      />

      <MousePointerClick
        className="relative"
        style={{
          right: `${styleRight}px`,
          bottom: `${styleBottom}px`,
          display: showClick ? "block" : "none",
        }}
      />
    </div>
  );
}
