<template>
    <div class="flex justify-center w-full">
        <div class="text-secondary xl:w-1/2 px-3">
        <p class="text-2xl font-bold mb-4 self-start">Welcome, {{ getCurrentUser.displayName || 'Joe' }}!</p>
        <p class="text-xs font-semibold mb-4">Edit your account settings here.</p>
        <div class="w-full bg-white border border-primary rounded-lg p-4 self-center">
            <div class="w-full bg-gray-100 rounded-lg flex justify-between items-center px-4 py-2 mb-4">
                <div class="w-full p-2">
                    <p class="font-semibold text-xl">Display Name:</p>
                    <input type="text"
                        :placeholder="`${getCurrentUser.displayName || 'Joe'}`"
                        class="mt-4 p-2 h-12 w-full border-2 border-secondary text-primary focus:outline-none rounded-lg"
                        v-model="displayName"
                    />
                </div>
            </div>

            <div class="w-full bg-gray-100 rounded-lg flex justify-between items-center px-4 py-2 mb-4">
                <div class="w-full p-2">
                    <p class="font-semibold text-xl">Phone Number:</p>
                    <input type="text"
                        :placeholder="`${getCurrentUser.phone|| '000-000-0000'}`"
                        class="mt-4 p-2 h-12 w-full border-2 border-secondary text-primary focus:outline-none rounded-lg"
                        v-model="phoneNumber"
                    />
                </div>
            </div>

            <div class="w-full bg-gray-100 rounded-lg flex justify-between items-center px-4 py-2 mb-4">
                <div class="w-full p-2">
                    <p class="font-semibold text-xl">Upload Photo:</p>
                    <div class="flex items-center justify-center mt-4 p-2">
                    <label class="w-full flex flex-col items-center px-4 py-6 bg-white text-primary rounded-lg shadow-lg tracking-wide uppercase border border-secondary cursor-pointer">
                        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-primary leading-normal">Select a file</span>
                        <input 
                            type='file' 
                            class="hidden" 
                            accept="image/*" 
                            @change="uploadFileToFirebaseStorage"
                        />
                    </label>
                </div>
                </div>
            </div>

            <div class="w-full flex justify-end">
                <button class="bg-primary text-secondary hover:bg-blue-600 focus:outline-none rounded-lg px-6 py-2 font-semibold shadow"
                    @click="updateUserDetails()"
                >Save</button>
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
</template>


<script>
import firebase from 'firebase'

export default({
    computed: {
        getCurrentUser() {
            return this.$store.getters.getCurrentUser
        }
    },
    data() {
        return {
            displayName: null,
            phoneNumber: null,
            photoUrl: null,
            updateMessage: {},
            showUpdateBanner: false,
        }
    },
    methods: {
        updateUserDetails() {
            
            let user = firebase.auth().currentUser;
            console.log(user)
            user.updateProfile({
                displayName: this.displayName || user.displayName,
                photoUrl: this.photoUrl || user.photoUrl,
                phone: this.phoneNumber || user.phone
            })
            .then(() => {
                //update success
                this.updateMessage = {
                    type: 'success',
                    message: 'Your profile was updated successfully.'
                }
                this.showUpdateBanner = true
                setTimeout(() => { this.showUpdateBanner = false }, 3000)
            })
            .catch((error) => {
                // An error happened
                this.updateMessage = {
                    type: 'error',
                    message: 'An error occurred while updating your profile.'
                }
                this.showUpdateBanner = true
                setTimeout(() => { this.showUpdateBanner = false }, 3000)
                console.log(error)
            })
        },
        uploadFileToFirebaseStorage(e) {
            console.log(e.target.files)
        }
    },
    mounted () {
        
    }
})
</script>
