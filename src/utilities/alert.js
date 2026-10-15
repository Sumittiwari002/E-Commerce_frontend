import Swal from "sweetalert2";

export const showSuccess = (message) => {
    return Swal.fire({
        title: "Success!",
        text: message,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6"
    });
};

export const showError = (message) => {
    return Swal.fire({
        title: "Oops!",
        text: message,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33"
    });
};

export const showWarning = (message) => {
    return Swal.fire({
        title: "Are you sure?",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33"
    });
};