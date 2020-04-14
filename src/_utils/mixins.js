import { msgs, icons } from "./alerts.js"
export default {
   data() {
      return {

      }
   },
   methods: {
      success(msg, custom) {
         const message = msg == null ? custom : msgs[msg]
         this.swalToast('success', message);
      },
      fail(msg, custom) {
         const message = msg == null ? custom : msgs[msg]
         this.swalToast('warning', message);
      },
      swalToast(icon, title) {
         const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
               toast.addEventListener('mouseenter', this.$swal.stopTimer)
               toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            }
         })
         Toast.fire({
            icon: icon,
            title: title
         })
      },
      swalConfirm(info) {
         return this.$swal.fire({
            title: info.title,
            text: info.text,
            position: 'center',
            icon: 'question',
            customClass: 'swal-confirm',
            showCancelButton: true,
            confirmButtonColor: '#bf74ff',
            cancelButtonColor: '#ff5722',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
         }).then((result) => result).catch(err => err);
      }
   }
}