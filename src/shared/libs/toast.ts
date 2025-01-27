import { toast } from "react-toastify";

export const showSuccessToast = (message: string) => {
  toast.success(message, { position: "top-center", className: "foo-bar" });
};

export const showInfoToast = (message: string) => {
  toast.info(message, { position: "top-center", className: "foo-bar" });
};

export const showErrorToast = (message: string) => {
  toast.error(message, { position: "top-center", className: "foo-bar" });
};

export const showWarningToast = (message: string) => {
  toast.warning(message, { position: "top-center", className: "foo-bar" });
};
