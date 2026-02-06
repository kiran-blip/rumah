"use client";

export default function Logo({ size = "large" }: { size?: "small" | "large" }) {
  const fontSize = size === "large" ? "text-5xl" : "text-2xl";
  return (
    <h1
      className={`${fontSize} font-extrabold tracking-tight`}
      style={{
        color: "#1a3fc7",
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', cursive",
        textTransform: "uppercase",
        letterSpacing: "1px",
      }}
    >
      Rumah
    </h1>
  );
}
