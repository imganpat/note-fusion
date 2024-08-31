const CancelIcon = ({ color = "#eff6ff", size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    color={color}
    fill={"none"}
  >
    <path
      d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CancelIcon;
