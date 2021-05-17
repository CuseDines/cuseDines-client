<template>
  <div id="orders" >
    <!-- breadcrumb -->
      <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
        <ol class="list-none p-0 inline-flex">
          <li class="flex items-center text-blue-500">
            <a href="/home" class="text-gray-700">Home</a>
            <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li class="flex items-center">
            <a href="/orders" class="text-gray-600">Orders</a>
          </li>
        </ol>
      </nav>
      <!-- breadcrumb end -->
    <!-- orders section begin -->
    <div class="w-full flex flex-col justify-center items-center"
      :class="{'opacity-0' : showReviewPopup}"
    >
      <accordion 
      class="flex flex-col w-1/2 justify-center"
      v-for="(order, index) in userOrders" 
      :key="index" :title="getOrderTitle(order.date, order.type)"
    >
      <div class="w-1/2">
        <div 
            class="flex m-1 flex-column justify-around h-24 w-full border-primary border-2 rounded-lg" 
            v-for="product in getItemsFromCartForPagination(order.uid)" :key="product.uid">
            <div class="text-secondary text-lg w-40 mt-8" >
                {{product.name}}
            </div>
            <div class="flex flex-row justify-center align-center gap-4 mt-8">
                  <div class="custom-number-input h-10 w-32">
                    <div class="flex justify-center align-center h-10 w-full text-lg text-secondary rounded-lg relative">
                        <span>{{ 'x' + product.quantity }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="max-w-lg mx-auto my-12" :disabled="checkPaginationDisabled">
            <pagination 
                :total-pages="getPaginationLength" 
                :total="userOrder.products.length" 
                :per-page="5" 
                :current-page="currentPage"
                :has-more-pages="checkIfPaginationHasMorePages" 
                @pagechanged="showMore"
            >
            </pagination>
        </div> -->
      </div>
      <div class="flex p-2 mt-4">
          <div class="flex-auto flex flex-row-reverse">
              <button class="text-secondary ml-2 focus:outline-none flex justify-center px-4 py-2 
                  rounded font-bold cursor-pointer text-secondary
                  bg-primary
                  border duration-200 ease-in-out 
                  border-primary transition"
                  @click="showPlaceReviewPopup(order.uid)" 
                  :disabled="order.review.length > 0" 
                  :class="{'cursor-not-allowed': order.review.length > 0}"
                  >
                  Add Review
              </button>
          </div>
      </div>
    </accordion>
    </div>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="showReviewPopup">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!--
        Background overlay, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <div class="inline-block align-bottom border-primary border-2 bg-white rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle w-1/3">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-secondary" id="modal-title">
                Add your review for this order:
              </h3>
              <div class="mt-2">
                <textarea
                    class="outline-none border-2 border-primary rounded-lg text-secondary p-2" 
                    name="review" id="review" cols="42" rows="5"
                    v-model="userReview"    
                >
                </textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button 
            type="button" 
            class="w-full inline-flex justify-center rounded-md shadow-sm px-4 
            py-2 bg-primary text-base font-medium text-secondary sm:ml-3 sm:w-auto sm:text-sm"
            @click="addReviewToOrder()"  
          >
            Add
          </button>
          <button 
            type="button" 
            class="mt-3 w-full inline-flex justify-center rounded-md border border-primary shadow-sm px-4 py-2 bg-red text-base font-medium text-secondary
              sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            @click="showReviewPopup = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
    <!-- orders section end -->
    <!-- notification banner -->
    <div class="w-full">
      <div
          class="text-white px-6 py-4 border-0 rounded fixed bottom-0 mb-4 bg-green m-auto"
          v-if="showUpdateBanner"
          :class="updateMessage.type === 'success' ? 'bg-green': 'bg-red'"
      >
          <span class="inline-block align-middle mr-8">
              <b class="capitalize">{{ updateMessage.type === 'success' ? 'Success!' : 'Error!' }}</b>
                  {{updateMessage.message}}
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import { orderCollection } from '../../firebase'
import Accordion from './Accordion'
export default {
  name: "Orders",
  components: {
    Accordion
  },
  computed: {
    // getPaginationLength() {
    //     let vm = this
    //     return Math.ceil(vm.userOrders.products.length / 5)
    // },
    // checkIfPaginationHasMorePages() {
    //     let vm = this
    //     return vm.currentPage < vm.getPaginationLength
    // },
    // getItemsFromCartForPagination() {
    //     let vm = this
    //     return vm.userOrders.products.slice(5 * (vm.currentPage - 1), 5 * vm.currentPage)
    // },
    // checkPaginationDisabled() {
    //     let vm = this
    //     return vm.getPaginationLength === 1
    // }
  },
  data () {
    return {
      userId: null,
      userOrders: [],
      showReviewPopup: false,
      currentOrder: null,
      userReview: '',
      showUpdateBanner: false,
      updateMessage: {
      }
    }
  },
  methods: {
    async getAllUserOrders () {
      let vm = this
      await orderCollection.where('userId', '==', vm.userId)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  vm.userOrders.push({
                    type: doc.data().type,
                    date: doc.data().date,
                    customise: doc.data().customise,
                    products: doc.data().products,
                    review: doc.data().review || '',
                    uid: doc.id
                  })
                })
            })
    },
    getOrderTitle(orderDate, orderType) {
      return `${orderType} on ${orderDate.toDate().toDateString()}`
    },
    getItemsFromCartForPagination(orderId) {
      let vm = this
      return vm.userOrders.filter(order => orderId === order.uid)[0].products
    },
    showPlaceReviewPopup(orderUid) {
      let vm = this
      vm.showReviewPopup = true
      vm.currentOrder = orderUid
    },
    async addReviewToOrder() {
      let vm = this
      await orderCollection.doc(vm.currentOrder).update({
        review: vm.userReview
      }).then(() => {
        vm.showReviewPopup = false
        this.updateMessage = {
            type: 'success',
            message: 'Your review was added!'
        }
        this.showUpdateBanner = true
        setTimeout(() => { 
            this.showUpdateBanner = false
        }, 3000)
      })
      .catch((error) => {
        console.log(error)
        vm.showReviewPopup = false
        this.updateMessage = {
            type: 'error',
            message: 'There was a problem while placing your review. Please try again later.'
        }
        this.showUpdateBanner = true
        setTimeout(() => { 
            this.showUpdateBanner = false
        }, 3000)
      })
    }
  },
  async mounted () {
    let vm = this
    vm.userId = window.localStorage.getItem('uid')
    await vm.getAllUserOrders()
  
  }
}
</script>