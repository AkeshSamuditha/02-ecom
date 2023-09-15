import toast, { Toaster } from "react-hot-toast";

export const notify = (type, message) => {
  if (type === "success") {
    toast.success(message, {
      position: "bottom-center",
    });
  } else if (type === "error") {
    toast.error(message, {
      position: "bottom-center",
      //   delay,
    });
  } else if (type === "warn") {
    toast.warn(message, {
      position: "bottom-center",
      //   delay,
    });
  } else {
    toast.info(message, {
      position: "bottom-center",
      //   delay,
    });
  }
};
