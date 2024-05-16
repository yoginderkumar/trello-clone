export function PlusIcon({ size }: { size?: number }) {
  size = size || 16;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      display="inlineBlock"
      fill="currentColor"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>
  );
}
