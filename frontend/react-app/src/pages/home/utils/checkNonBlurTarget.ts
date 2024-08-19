export function checkNonBlurTarget(target: HTMLElement) {
  return (
    target.dataset.nonblur === "true" ||
    target.closest(".ant-picker-dropdown") ||
    target.closest(".ant-picker") ||
    target.closest(".chatbot")
  );
}
