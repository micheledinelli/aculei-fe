export default function CloseSvg() {
  return (
    <div className="text-6xl fixed top-10 right-10 z-10 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill=""
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        className="w-14 h-14 hover:invert"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  );
}
