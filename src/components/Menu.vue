<template>
    <div class="leading-normal tracking-normal" id="main-body">
        <div class="flex flex-wrap justify-center">

        <Sidebar />

        <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen" :class="sideBarOpen ? 'overlay' : ''" id="main-content">

            <Navbar />

            <div class="p-6 bg-gray-100 mb-20 w-full">
            <div id="menu">
            <!-- breadcrumb -->
            <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
                <ol class="list-none p-0 inline-flex">
                    <li class="flex items-center text-blue-500">
                    <a href="/home" class="text-gray-700">Home</a>
                    <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                    </li>
                    <li class="flex items-center">
                    <a href="/menu" class="text-gray-600">Menu</a>
                    </li>
                </ol>
            </nav>
            <!-- breadcrumb end -->
            <!-- stepper for station selection -->
            <div class="p-5 w-3/4 h-full m-auto">
                <div class="stepper-header">
                  <div class="mx-4 p-4">
                    <div class="flex items-center">
                        <div class="flex items-center text-primary relative">
                            <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark ">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </div>
                            <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-primary">Station</div>
                        </div>
                        <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-primary"></div>
                        <div class="flex items-center text-primary relative">
                            <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail ">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-primary">Customise</div>
                        </div>
                        <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-primary"></div>
                        <div class="flex items-center text-primary relative">
                            <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-database ">
                                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                                </svg>
                            </div>
                            <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">Confirm</div>
                        </div>
                    </div>
                </div>
                <div class="stepper-content w-full flex justify-start align-start">
                  <!-- station card -->
                <div class="mt-8 p-4 w-full"  v-if="state == 'station'" id="station">
                    <div class="h-full w-full flex flex-col justify-center">
                        <accordion 
                            class="flex flex-col justify-center"
                            v-for="station in stations" 
                            :key="station.uid" :title="station.name"
                        >
                            <div 
                                class="flex m-1 flex-column justify-around items-center
                                h-24 w-3/4 border-primary border-2 rounded-lg" 
                                v-for="product in returnProductArrayForStation(station.name)" :key="product.uid"   
                            >
                                <div class="flex flex-column">
                                    <div class="text-secondary text-lg w-40" >
                                        {{product.name}}
                                    </div>
                                    <div>
                                        <!-- <img 
                                            :src="`https://storage.googleapis.com/products/${product.uid}/${product.picture}`" 
                                            alt="nutrition info"
                                        >     -->
                                    </div>
                                </div>
                                <div class="custom-number-input h-10 w-32 border-primary border-2 rounded-lg">
                                    <div class="flex justify-center align-center h-10 w-full rounded-lg relative">
                                        <button
                                            class="text-primary h-full w-20 rounded-l cursor-pointer outline-none"
                                            @click="removeFromCart(product.uid)"
                                        >
                                            <span class="text-2xl font-thin">−</span>
                                        </button>
                                        <input 
                                            type="number" 
                                            class="outline-none text-center w-full h-8
                                                font-semibold text-md  md:text-basecursor-default 
                                                text-secondary  outline-none" 
                                            name="custom-input-number" 
                                            :value="getProductQuantity(product.uid)"
                                        >
                                        <button 
                                            class="bg-gray-300 text-primary h-full w-20 rounded-r cursor-pointer"
                                            @click="addToCart(product.uid, product.name)"
                                        >
                                            <span class="m-auto text-2xl font-thin">+</span>
                                        </button>
                                    </div>
                                </div>    
                            </div>
                        </accordion>
                    </div>
                    <div class="flex p-2 mt-4">
                        <div class="flex-auto flex flex-row-reverse">
                            <button class="text-secondary ml-2 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer  
                                text-teal-100 
                                border duration-200 ease-in-out 
                                border-primary transition"
                                @click="changeToNextCard('customise')"  
                                >
                                Next
                            </button>
                        </div>
                    </div>
                    </div>
                    <!-- station card end -->
                    <!-- customize order card start -->
                        <div class="w-full mt-8 p-4 text-secondary" v-if="state == 'customise'" id="customise">
                            
                            <div class="w-full m-2 flex flex-col align-center justify-center">
                                <div><h2>Add your instructions here:</h2></div>
                                <textarea
                                    class="outline-none border-2 border-primary rounded-lg text-secondary" 
                                    name="customise" id="customise" cols="50" rows="5"
                                    v-model="userOrder.customise"    
                                >
                                </textarea>
                            </div>
                            <div class="flex p-2 mt-4 w-full">
                                <div class="flex-auto flex flex-row-reverse justify-between">
                                    <button class="text-secondary ml-2 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer  
                                        text-teal-100 
                                        border duration-200 ease-in-out 
                                        border-primary transition"
                                        @click="changeToNextCard('confirm')"  
                                        >
                                        Next
                                    </button>
                                    <button class="text-secondary ml-2 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer  
                                        text-teal-100 
                                        border duration-200 ease-in-out 
                                        border-primary transition"
                                        @click="changeToNextCard('station')"  
                                        >
                                        Previous
                                    </button>
                                </div>                        
                            </div>
                        </div>
                    </div>
                    <!-- customize order card end -->
                    <!-- confirm order card start -->
                    <div class="w-full mt-8" v-if="state == 'confirm'">
                        <div class="w-full">
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
                                    <div class="h-6 w-6 mt-2 text-primary cursor-pointer" @click.prevent="removeFromCart(product.uid)">
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
                                    :total="userOrder.products.length" 
                                    :per-page="5" 
                                    :current-page="currentPage"
                                    :has-more-pages="checkIfPaginationHasMorePages" 
                                    @pagechanged="showMore"
                                >
                                </pagination>
                            </div>
                        </div>
                        
                        <div class="flex p-2 mt-4 w-full">
                            <div class="flex-auto flex flex-row-reverse justify-between">
                                <button class="text-secondary ml-2 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer  
                                    text-teal-100 
                                    border duration-200 ease-in-out 
                                    border-primary transition"
                                    @click="placeOrder()"  
                                    >
                                    Place Order
                                </button>
                                <button class="text-secondary ml-2 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer  
                                    text-teal-100 
                                    border duration-200 ease-in-out 
                                    border-primary transition"
                                    @click="changeToNextCard('customise')"  
                                    >
                                    Previous
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- confirm order card end -->
                </div>
              
              </div>
            </div>
        </div>
      </div>
      <!-- notification banner -->
        <div 
            class="text-white px-6 py-4 border-0 rounded fixed bottom-0 mb-4 bg-green"
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
import { mapState } from 'vuex'
import { productCollection, stationCollection, orderCollection, realtimeDb } from '../../firebase'
import firebase from 'firebase/app'
import 'firebase/database'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Accordion from './Accordion'
import Pagination from './Pagination'

export default{
    name: 'Menu',
    computed: {
    ...mapState(['sideBarOpen']),
    getPaginationLength() {
        let vm = this
        return Math.ceil(vm.userOrder.products.length / 5)
    },
    checkIfPaginationHasMorePages() {
        let vm = this
        return vm.currentPage < vm.getPaginationLength
    },
    getItemsFromCartForPagination() {
        let vm = this
        return vm.userOrder.products.slice(5 * (vm.currentPage - 1), 5 * vm.currentPage)
    },
    checkPaginationDisabled() {
        let vm = this
        return vm.getPaginationLength === 1
    }
  },
  components: {
    Sidebar,
    Navbar,
    Accordion,
    Pagination
  },
  data() {
      return {
        nowServing: null,
        stations: [],
        Salad: [],
        HotLine: [],
        Vegan: [],
        MadetoOrder: [],
        Grill: [],
        products: [],
        userOrder: {
            products: [],
            customise: ''
        },
        state: 'station',
        buttonDisabled: true,
        showUpdateBanner: false,
        updateMessage: {},
        userId: null,
        hasMorePages: true,
        currentPage: 1,
        page: 1,

      }
  },
  methods: {
    async getAllStations() {
        let vm = this
        let snapshot = await stationCollection.get();
        snapshot.forEach(async doc => {
            vm.stations.push({
                uid: doc.id,
                name: doc.data().name,
                products: doc.data().products
            })
            await vm.getAllProductsFromStation(doc.id)
        })
    },
    async getAllProductsFromStation(stationUid) {
        let vm = this
        let station = vm.stations.filter(station => station.uid === stationUid)
        station[0].products.forEach(async (product) => {
            const productRef = await productCollection.doc(product)
            productRef.get().then(doc => {
                if(doc.data().description == vm.getClientLocalTime()) {
                    vm[station[0].name.replace(/\s/g, '')].push({
                        uid: doc.id,
                        description: doc.data().description,
                        name: doc.data().name,
                        picture: doc.data().picture
                    })
                }
            })
        })
    },
    getClientLocalTime () {
        let date = new Date()
        let hrs = date.getHours()
        return (hrs > 7 && hrs < 10) ? 'Breakfast'  : 
            (hrs >= 10 && hrs < 17) ? 'Lunch' : 
            (hrs >= 17 && hrs <= 23) ? 'Dinner': 'Closed'
    },
    changeToNextCard(cardName) {
        this.state =  cardName
    },
     async addToCart(productId, productName) {
        let vm = this
        const updates = {}
        updates[`products/${productId}/quantity`] = firebase.database.ServerValue.increment(1)
        updates[`products/${productId}/name`] = productName
        realtimeDb.ref(vm.userId).update(updates)
    },
    removeFromCart(productId) {
        let vm = this
        
        // realtimeDb.ref(`${vm.userId}/products/${productId}/quantity`).get().then(async snapshot => {
        //     if(snapshot.val() > 1) {
        //         var updates = {};
        //         updates[`${vm.userId}/products/${productId}/quantity`] = firebase.database.ServerValue.increment(-1);
        //         realtimeDb.ref(vm.userId).update(updates)
        //     }
        //     else {
        //         const updates = {}
        //         updates[`products/${productId}`] = null
        //             realtimeDb.ref(vm.userId).update(updates)
        //     }
        // })
        // .catch(error => console.log(error))
        const quantity = realtimeDb.ref(`${vm.userId}/products/${productId}/quantity`);
        quantity.once('value', (snapshot) => {
            if(snapshot.val() > 1) {
                const updates = {}
                updates[`products/${productId}/quantity`] = firebase.database.ServerValue.increment(-1)
                // updates[`products/${productId}/name`] = productName
                realtimeDb.ref(vm.userId).update(updates)
            } 
            else {
                const updates = {}
                updates[`products/${productId}`] = null
                realtimeDb.ref(vm.userId).update(updates)
                // vm.userOrder.products.filter(product => product.uid === productId)[0]
            }
        })

        // if(vm.userOrder.products.filter(product => product.uid === productId)[0].quantity > 1) {
        //     vm.userOrder.products.filter(product => product.uid === productId)[0].quantity -= 1
        // }
        // else {
        //     let prodIndex;
        //     vm.userOrder.products.forEach((prod, index) => {
        //         if(prod.uid === productId) {
        //             prodIndex = index
        //         }
        //     })
        //     vm.userOrder.products.splice(prodIndex, 1)
        // }
        
    },
    getProductQuantity(productId) {
        let vm = this
        if(vm.userOrder.products.filter(prod => prod.uid === productId).length) {
            return vm.userOrder.products.filter(prod => prod.uid === productId)[0].quantity
        }
        else {
            return 0
        }
    },
    async placeOrder() {
        let vm = this
        let products = vm.userOrder.products.map((obj) => {return Object.assign({}, obj)})
        let time = vm.getClientLocalTime()
        let finalOrder = Object.assign({}, {
            userId: vm.userId,
            customise: vm.userOrder.customise,
            products: products,
            date: new Date(),
            type: time
        })
        orderCollection.add(finalOrder).then((docRef) => {
            console.log(docRef)
            vm.showMessageBanner('success', 'Your Order was placed successfully.')
            //empty user cart              
            vm.userOrder = {
                products: [],
                customise: ''
            }
            vm.emptyUserCart()
        })
        .catch(error => {
            console.log(error)
            vm.showMessageBanner('error', 'There was a problem placing your order. Please try again')
        })
        
    },
    showMessageBanner(type, message) {
        this.updateMessage = {
            type,
            message
        }
        this.showUpdateBanner = true
        setTimeout(() => { 
            this.showUpdateBanner = false,
            this.$router.push('/home')
        }, 3000)
    },
    async getUserCart() {
        let vm = this
        const cart = realtimeDb.ref(`${vm.userId}/products`)
        cart.on('value', (snapshot) => {
            Object.keys(snapshot.val()).forEach(key => {
                let isKeyInCart = vm.userOrder.products.filter(prod => prod.uid === key).length > 0
                if(!isKeyInCart) {
                    vm.userOrder.products.push({
                        uid: key,
                        quantity: snapshot.val()[key].quantity,
                        name: snapshot.val()[key].name
                    })
                }
                else if(snapshot.val()[key].quantity != vm.userOrder.products.filter(prod => prod.uid === key)[0].quantity) {
                    vm.userOrder.products.filter(prod => prod.uid === key)[0].quantity = snapshot.val()[key].quantity
                }
            })
        })
    },
    returnProductArrayForStation(stationName) {
        let vm = this
        return vm[stationName.replace(/\s/g, '')]
    },
    deleteItemFromCart(itemUid) {
        const updates = {}
        updates[`products/${itemUid}`] = null
        realtimeDb.ref(vm.userId).update(updates)
    },
    showMore(page) {
      this.page = page;
      this.currentPage = page;
    },
    emptyUserCart() {
        let vm = this
        realtimeDb.ref(vm.userId).remove()
    }
  },
  async mounted () {
    let vm = this
    vm.userId = window.localStorage.getItem('uid')
    await vm.getAllStations()
    await vm.getUserCart()
  },
}
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>