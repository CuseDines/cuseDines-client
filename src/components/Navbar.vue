<template>
    <div class="sticky top-0 z-40">
            <div class="w-full h-20 px-6 bg-secondary border-b flex items-center justify-between">

              <!-- left navbar -->
              <div class="flex">

                <!-- mobile hamburger -->
                <div class="inline-block lg:hidden flex items-center mr-4">
                  <button
                    class="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger"
                    @click="toggleSidebar()"
                  >
                    <svg class="h-5 w-5" 
                      v-bind:style="{ fill: 'black' }"
                      viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Menu</title>
                      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- right navbar -->
              <div class="flex items-center relative">
                <svg xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  viewBox="0 0 30 30"
                  width="30"
                  class="fill-current text-primary mr-3 hover:text-blue-500 h-12 w-12"
                >
                  <path d="M0 0h24v24H0z" 
                    fill="none"
                  />
                  <path 
                    d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 
                      2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 
                      1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 
                      1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
                    />
                </svg>
                <img
                  src="@/assets/img/pngkey.com-avatar-png-1149878.png"
                  class="w-12 h-12 rounded-full shadow-lg"
                >
              </div>

            </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Navbar',
    computed: {
        ...mapState(['sideBarOpen'])
    },
    data() {
        return {
            dropDownOpen: false
        }
    },
    methods: {
        toggleSidebar() {
            this.$store.dispatch('toggleSidebar')
        }
    }
}
</script>