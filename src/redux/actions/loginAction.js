export const HANDLE_VISIBLE = "HANDLE_VISIBLE";
export const HANDLE_REDIRECT = "HANDLE_REDIRECT";

export const handleVisible = isVisible => ({
  type: HANDLE_VISIBLE,
  isVisible
});

export const handleRedirect = redirectTo => ({
  type: HANDLE_REDIRECT,
  redirectTo
});
