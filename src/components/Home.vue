<template>
    <div id="home">

        <!-- breadcrumb -->
            <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
              <ol class="list-none p-0 inline-flex">
                <li class="flex items-center text-blue-500">
                  <a href="/home" class="text-gray-700">Home</a>
                  <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                </li>
                <li class="flex items-center">
                  <a href="/" class="text-gray-600">Dashboard</a>
                </li>
              </ol>
            </nav>
            <!-- breadcrumb end -->

            <div class="lg:flex justify-between items-center mb-6">
              <p class="text-2xl text-secondary font-semibold mb-2 lg:mb-0">Good {{getClientGreeting}}!</p>
              <button 
                class="bg-primary text-secondary hover:bg-blue-600 focus:outline-none rounded-lg 
                  px-6 py-2 font-semibold shadow"
                @click="redirectTo('/menu')"
              >
                  New Order
              </button>
            </div>

            <div class="flex flex-wrap mx-3 mb-20">

              <!-- <div class="w-1/2 xl:w-1/4 px-3">
                <div class="w-full bg-white border text-primary rounded-lg flex items-center p-6 mb-6 xl:mb-0">
                  <svg class="w-16 h-16 mr-4 fill-current" viewBox="0 0 20 16">
                    <path d="M18 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 14H2V8h16v6zm0-10H2V2h16v2z"
                      fill="fill-current"
                      fill-rule="evenodd"/>
                  </svg>
                  <div class="text-secondary">
                    <p class="font-semibold text-3xl">$ 237</p>
                    <p>Mealpass Balance</p>
                  </div>

                </div>
              </div> -->

              <div class="w-1/2 xl:w-1/4 px-3">
                <div class="w-full bg-white border text-primary rounded-lg flex items-center p-6 mb-6 xl:mb-0">
                  <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
                    <path d="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"></path>
                  </svg>

                  <div class="text-secondary">
                    <p class="font-semibold text-3xl">{{ userOrders.length }}</p>
                    <p>Total Orders Placed</p>
                  </div>
                </div>
              </div>

              <div class="w-1/2 xl:w-1/4 px-3">
                <div class="w-full bg-white border text-primary rounded-lg flex items-center p-6">
                  <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
                    <path d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z"></path>
                  </svg>

                  <div class="text-secondary">
                    <p class="font-semibold text-3xl">{{ getUserReviews }}</p>
                    <p>Reviews Placed</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3">
              <div class="w-full text-secondary xl:w-1/3 px-3">
                <p class="text-xl font-semibold mb-4">Recent Orders</p>
                <div class="w-full bg-white border border-primary rounded-lg p-4">
                  <div class="w-full bg-gray-100 border border-primary rounded-lg flex
                    justify-between items-center px-4 py-2 mb-4"
                    v-for="(order, index) in getRecentOrders"
                    :key="index"
                  >
                      <div>
                          <p class="font-semibold text-xl text-secondary">{{ `${order.date.toDate().toDateString()}` }}</p>
                          <p>{{ order.type.toUpperCase() }}</p>
                      </div>
                  </div>

                  <!-- <div class="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4">
                      <div>
                          <p class="font-semibold text-xl">Joseph Brent</p>
                          <p>Product 34</p>
                      </div>
                      <span class="text-red-500 font-semibold text-lg">$74.99</span>
                  </div>

                  <div class="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4">
                      <div>
                          <p class="font-semibold text-xl">Jacob Bator</p>
                          <p>Product 23</p>
                      </div>
                      <span class="text-green-500 font-semibold text-lg">$14.95</span>
                  </div>

                  <div class="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2">
                      <div>
                          <p class="font-semibold text-xl">Alex Mason</p>
                          <p>Product 66</p>
                      </div>
                      <span class="text-green-500 font-semibold text-lg">$44.99</span>
                  </div> -->
                </div>
              </div>

            </div>

    </div>
</template>

<script>
// import Chart from 'chart.js'
import { auth, userCollection, orderCollection } from '../../firebase'
export default {
    name: 'DashboardHome',
    computed: {
      getClientGreeting() {
        let date = new Date()
        let hrs = date.getHours()

        return hrs < 12 ? 'morning' : (hrs >= 12 && hrs <= 17) ? 'afternoon' : 'evening'
      },
      getUserDisplayName() {
        return this.$store.getters['getCurrentUser'].displayName || 'Joe'
      },
      getUserReviews() {
        let vm = this
        return vm.userOrders.filter(order => order.review).map(order => order.review).length
      },
      getRecentOrders () {
        let vm = this
        return vm.userOrders.slice(0, 5)
      }
    }, 
    methods: {
      redirectTo(path) {
        this.$router.push({ path: path })
      },
      async fetchUserOrders() {
        let vm = this
        await orderCollection.where('userId', '==', vm.userId)
          .get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                vm.userOrders.push({
                  type: doc.data().type,
                  date: doc.data().date,
                  customise: doc.data().customise,
                  products: doc.data().products,
                  review: doc.data().review,
                  uid: doc.id
                })
              })
          })
      },
      
    },
    data() {
        return {
          userOrders: [],
          userId: null
        }
    },
    async mounted (){
      let vm = this;
      await auth.onAuthStateChanged(async (user) => {
        if (user) {
          // User is signed in
          vm.$store.dispatch('setCurrentUser',{
            email: user.email,
            displayName: user.displayName,
            phone: user.phone,
            uid: user.uid
          })
          window.localStorage.setItem('signedIn', 'True')
          window.localStorage.setItem('uid', user.uid)
          vm.userId = user.uid
          //check if user record exists in user collection
          const userRef = await userCollection.doc(user.uid)
          const userDoc = await userRef.get()
          if(!userDoc.exists) {
            //if record doesnt exist create record
            await userCollection.doc(user.uid).set({
              displayName: user.displayName,
              order: []
            })
          }
          await vm.fetchUserOrders()
        } else {
          // No user is signed in.
          vm.$router.push('/login')
        }
      });   
      
    }
}
</script>