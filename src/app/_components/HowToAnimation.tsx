"use client";

import { Medal } from "lucide-react";
import { useEffect, useState } from "react";

export default function HowToAnimation() {
  const [hit, setHit] = useState(0);
  const [miss, setMiss] = useState(0);

  function nextThrow() {
    if (hit >= 20) {
      setHit(0);
      setMiss(0);
    }

    if (Math.random() < 0.5) {
      // Hit
      setHit((prev) => prev + 1);
    } else {
      // Miss
      setMiss((prev) => prev + 1);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => nextThrow(), 3000);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
      <span>Target:</span>

      <h2 className="text-6xl font-semibold">
        {hit >= 20 ? <Medal size={50} /> : hit + 1}
      </h2>

      <div className="flex flex-row gap-4">
        <span>Hit: {hit}</span>
        <span>Miss: {miss}</span>
      </div>
    </div>
  );
}
