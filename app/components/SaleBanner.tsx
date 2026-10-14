"use client";

import { useEffect, useState } from "react";

export default function SaleBanner() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      // Construct in the browser's local timezone: November 30 stays included
      // everywhere, with the countdown ending as December 1 begins.
      const saleEnd = new Date(2026, 11, 1).getTime();
      setRemaining(Math.max(0, saleEnd - Date.now()));
    };
    update();
    const interval = window.setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const seconds = remaining === null ? null : Math.ceil(remaining / 1000);
  const units = [
    { label: "Days", value: seconds === null ? null : Math.floor(seconds / 86400) },
    { label: "Hours", value: seconds === null ? null : Math.floor(seconds / 3600) % 24 },
    { label: "Minutes", value: seconds === null ? null : Math.floor(seconds / 60) % 60 },
    { label: "Seconds", value: seconds === null ? null : seconds % 60 },
  ];

  return (
    <section className="sale-banner" aria-label="Early Black Friday Sale">
      <div className="sale-banner-inner">
        <div
          className="sale-countdown"
          role="timer"
          aria-live="off"
          aria-label={seconds === null ? "Loading countdown" : `${units[0].value} days, ${units[1].value} hours, ${units[2].value} minutes, ${units[3].value} seconds remaining`}
          title="Ends at the end of November 30, 2026, in your local time zone"
        >
          <span className="sale-countdown-dot" aria-hidden="true" />
          {units.map(({ label, value }, index) => (
            <div className="sale-countdown-unit" key={label}>
              {index > 0 && <span className="sale-countdown-colon" aria-hidden="true">:</span>}
              <span className="sale-countdown-number sale-countdown-number-red" aria-hidden="true">
                <span key={value} className="sale-countdown-digit">
                  {value === null ? "--" : String(value).padStart(2, "0")}
                </span>
              </span>
              <span className="sale-countdown-label" aria-hidden="true">{label}</span>
            </div>
          ))}
        </div>
        <p className="sale-banner-title">
          {remaining === 0 ? "Black Friday Sale Ended" : "Early Black Friday Sale"}
        </p>
      </div>
    </section>
  );
}
