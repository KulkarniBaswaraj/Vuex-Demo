import { msgs, icons } from "./alerts.js"
export default {
   data() {
      return {
         
      }
   },
   methods: {
      getIcon(msg) {
         return {
            icon: {
               name: `mdi mdi-${icons[msg]}`
            }
         }
      },
      success(msg) {
         this.$toasted.success(msgs[msg], this.getIcon(msg));
      },
      fail(msg) {
         this.$toasted.error(msgs[msg], this.getIcon(msg));
      }
   }
}