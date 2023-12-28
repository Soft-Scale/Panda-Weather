import swal from "sweetalert"

export function useModal() {
  const modal = (message, text, level = "success") => {
    swal(message, text, level)
  }
  return { modal }
}
