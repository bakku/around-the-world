"use client";

import {
  Check,
  Clipboard,
  MousePointer2,
  MousePointerClick,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { doTimes, wait } from "@/lib/animations";

export default function BookmarkExample() {
  const mousePointer = useRef<SVGSVGElement>(null);

  const [styleBottom, setStyleBottom] = useState(0);
  const [styleRight, setStyleRight] = useState(-80);
  const [showClick, setShowClick] = useState(false);
  const [buttonSwitched, setButtonSwitched] = useState(false);

  async function animate() {
    await doTimes(20, () => setStyleBottom((prevState) => prevState + 1), 30);

    await doTimes(20, () => setStyleRight((prevState) => prevState + 1), 30);

    await wait(600);

    setShowClick(true);

    await wait(100);

    setShowClick(false);
    setButtonSwitched(true);

    await wait(6000);

    // Reset animation.
    setStyleRight(-80);
    setStyleBottom(0);
    setShowClick(false);
    setButtonSwitched(false);

    return Promise.resolve();
  }

  function startAnimation() {
    animate().then(startAnimation);
  }

  useEffect(() => {
    startAnimation();
    // This useEffect should only run on the first mount.
    // eslint-disable-next-line
  }, []);

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
