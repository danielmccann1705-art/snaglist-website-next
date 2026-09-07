export const pinPath =
  "M12 1C5.9 1 1.5 5.6 1.5 11.5 1.5 19 12 31 12 31s10.5-12 10.5-19.5C22.5 5.6 18.1 1 12 1z";
export function Pin({ complete = false }: { complete?: boolean }) {
  return (
    <svg
      className={complete ? "pin complete" : "pin"}
      viewBox="0 0 24 32"
      aria-hidden="true"
    >
      <path
        d={pinPath}
        fill={complete ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      />
      {complete && (
        <path
          d="M7 11.5l3.5 3.5 6.5-7"
          fill="none"
          stroke="#F7F8FA"
          strokeWidth="2.2"
        />
      )}
    </svg>
  );
}
export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <img
      className="wordmark"
      src={dark ? "/brand/wordmark-dark.svg" : "/brand/wordmark.svg"}
      alt="Snaglist"
      width="146"
      height="42"
    />
  );
}
