import React, { useState, useEffect } from "react";

const todayKey = () => new Date().toISOString().slice(0, 10);

const emptyDay = {
  coffee: 0,
  tea: 0,
  water: 0,
  hairCare: false,
  faceCare: false,
  archery: false,
};

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("me-supreme-data");
    return saved ? JSON.parse(saved) : {};
  });

  const today = todayKey();
  const day = data[today] || emptyDay;

  useEffect(() => {
    localStorage.setItem("me-supreme-data", JSON.stringify(data));
  }, [data]);

  const updateDay = (changes) => {
    setData({
      ...data,
      [today]: { ...day, ...changes },
    });
  };

  const summary = (daysBack) => {
    const dates = Object.keys(data);
    const now = new Date();

    const filtered = dates.filter(
      (d) => (now - new Date(d)) / 86400000 <= daysBack
    );

    return filtered.reduce(
      (acc, d) => {
        const x = data[d];
        acc.coffee += x.coffee;
        acc.tea += x.tea;
        acc.water += x.water;
        acc.hair += x.hairCare ? 1 : 0;
        acc.face += x.faceCare ? 1 : 0;
        acc.archery += x.archery ? 1 : 0;
        return acc;
      },
      { coffee: 0, tea: 0, water: 0, hair: 0, face: 0, archery: 0 }
    );
  };

  return (
    <div style={{ maxWidth: 420, margin: "auto", padding: 16, fontFamily: "system-ui" }}>
      <h3>{today}</h3>

      <div>
        ☕ Coffee{" "}
        <button onClick={() => updateDay({ coffee: day.coffee + 1 })}>+</button>{" "}
        {day.coffee}
      </div>

      <div>
        🍵 Tea{" "}
        <button onClick={() => updateDay({ tea: day.tea + 1 })}>+</button>{" "}
        {day.tea}
      </div>

      <div>
        💧 Water{" "}
        <button onClick={() => updateDay({ water: day.water + 1 })}>+</button>{" "}
        {day.water}
      </div>

      <hr />

      <label>
        <input
          type="checkbox"
          checked={day.hairCare}
          onChange={() => updateDay({ hairCare: !day.hairCare })}
        />{" "}
        Hair care
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          checked={day.faceCare}
          onChange={() => updateDay({ faceCare: !day.faceCare })}
        />{" "}
        Face care
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          checked={day.archery}
          onChange={() => updateDay({ archery: !day.archery })}
        />{" "}
        Archery practice
      </label>

      <hr />

      <details>
        <summary>Last 7 days</summary>
        <pre>{JSON.stringify(summary(7), null, 2)}</pre>
      </details>

      <details>
        <summary>Last 30 days</summary>
        <pre>{JSON.stringify(summary(30), null, 2)}</pre>
      </details>

      <p style={{ marginTop: 20, fontSize: 12, opacity: 0.6 }}>
        Me Supreme — nothing UI. Track. Close. Live.
      </p>
    </div>
  );
}
