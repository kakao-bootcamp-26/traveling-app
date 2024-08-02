type Props = {
  hasError: boolean;
  message?: string;
  color?: string;
  fontSize?: string;
};
export default function ErrorMessageConfirmation({
  message = "",
  hasError,
  color = "red",
  fontSize = "14px",
}: Props) {
  return (
    <div
      style={{
        minHeight: "24px",
        height: "24px",
        fontSize,
        color,
        display: "flex",
        alignItems: "center",
      }}
    >
      {hasError && <p>{message}</p>}
    </div>
  );
}
