<template>
    <div id="cart">
         <!-- breadcrumb -->
            <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
              <ol class="list-none p-0 inline-flex">
                <li class="flex items-center text-blue-500">
                  <a href="/home" class="text-gray-700">Home</a>
                  <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                </li>
                <li class="flex items-center">
                  <a href="/cart" class="text-gray-600">Cart</a>
                </li>
              </ol>
            </nav>
          <!-- breadcrumb end -->
          <div class="w-full flex items-center justify-center mt-8">
            <div class="w-3/4" v-if="products.length > 0">
                <div 
                    class="flex m-1 flex-column justify-around h-24 w-full border-primary border-2 rounded-lg" 
                    v-for="product in getItemsFromCartForPagination" :key="product.uid">
                    <div class="text-secondary text-lg w-40 mt-8" >
                        {{product.name}}
                    </div>
                    <div class="flex flex-row justify-center align-center gap-4 mt-8">
                          <div class="custom-number-input h-10 w-32 border-primary border-2 rounded-lg">
                            <div class="flex justify-center align-center h-10 w-full text-lg text-secondary rounded-lg relative">
                                <span>{{ 'x' + product.quantity }}</span>
                            </div>
                        </div>
                        <div class="h-6 w-6 mt-2 text-primary cursor-pointer" @click="removeFromCart(product.uid, product.name)">
                            <svg class="fill-current" viewBox="0 0 489 489">
                                <defs/>
                                <path d="M381 112H107a24 24 0 00-24 25l10 308c0 12 11 23 24 23h20v-21c0-24 19-44 43-44h128c24 0 44 20 44 44v21h20c13 0 23-10 24-23l9-308a24 24 0 00-24-25z"/>
                                <path d="M309 435H181c-6 0-12 5-12 12v31c0 7 6 11 12 11h128c6 0 12-5 12-11v-31c0-6-6-12-12-12zM428 27c0-15-12-27-27-27H88C73 0 61 12 61 27v31c0 15 12 27 27 27h313c15 0 27-12 27-27V27z"/>
                            </svg>
                        </div> 
                    </div>
                </div>
                <div class="max-w-lg mx-auto my-12" :disabled="checkPaginationDisabled">
                    <pagination 
                        :total-pages="getPaginationLength" 
                        :total="products.length" 
                        :per-page="5" 
                        :current-page="currentPage"
                        :has-more-pages="checkIfPaginationHasMorePages" 
                        @pagechanged="showMore"
                    >
                    </pagination>
                </div>
            </div>
            <div 
              class="text-lg text-bold text-secondary"
              v-else
            >
                There are no items in your cart currently. Please add some items to continue.
            </div>
          </div> 
    </div>
</template>

<script>
import Pagination from './Pagination'
import { realtimeDb } from '../../firebase'

export default {
  name: 'Cart',
  components: {
    Pagination
  },
  computed: {
    getPaginationLength() {
        let vm = this
        return Math.ceil(vm.products.length / 5)
    },
    checkIfPaginationHasMorePages() {
        let vm = this
        return vm.currentPage < vm.getPaginationLength
    },
    getItemsFromCartForPagination() {
        let vm = this
        return vm.products.slice(5 * (vm.currentPage - 1), 5 * vm.currentPage)
    },
    checkPaginationDisabled() {
        let vm = this
        return vm.getPaginationLength === 1
    }
  },
  data() {
    return {
      userId: null,
      hasMorePages: true,
      currentPage: 1,
      page: 1,
      products: []
    }
  },
  methods: {
    async getUserCart() {
        let vm = this
        const cart = realtimeDb.ref(`${vm.userId}/products`)
        cart.on('value', (snapshot) => {
            Object.keys(snapshot.val()).forEach(key => {
                let isKeyInCart = vm.products.filter(prod => prod.uid === key).length > 0
                if(!isKeyInCart) {
                    vm.products.push({
                        uid: key,
                        quantity: snapshot.val()[key].quantity,
                        name: snapshot.val()[key].name
                    })
                }
                else if(snapshot.val()[key].quantity != vm.products.filter(prod => prod.uid === key)[0].quantity) {
                    vm.products.filter(prod => prod.uid === key)[0].quantity = snapshot.val()[key].quantity
                }
            })
        })
    },
    removeFromCart(productId, productName) {
      let vm = this
      const quantity = realtimeDb.ref(`${vm.userId}/products/${productId}/quantity`);
      quantity.on('value', (snapshot) => {
          if(snapshot.val() > 1) {
              const updates = {}
              updates[`products/${productId}/quantity`] = firebase.database.ServerValue.increment(-1)
              updates[`products/${productId}/name`] = productName
              realtimeDb.ref(vm.userId).update(updates)
          } 
          else {
              const updates = {}
              updates[`products/${productId}`] = null
              realtimeDb.ref(vm.userId).update(updates)
          }
      })
    },
    showMore(page) {
      this.page = page;
      this.currentPage = page;
    }
  },
  async mounted () {
    let vm = this
    vm.userId = window.localStorage.getItem('uid')
    await vm.getUserCart()
  },
}
</script>