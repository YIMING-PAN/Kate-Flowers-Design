export const UPDATE_REGISTER_FORM = "UPDATE_REGISTER_FORM";
export const RESET_FORM = "RESET_FORM";

export const updateRegisterForm = registerForm => ({
  type: UPDATE_REGISTER_FORM,
  registerForm
});

export const resetForm = () => ({
  type: RESET_FORM
});
