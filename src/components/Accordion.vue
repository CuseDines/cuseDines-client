<template>
    <div class="">
        <div class="tab__header">
            <a href="#" 
                class="tab__link p-4 block no-underline text-secondary 
                border-b-2 border-primary flex justify-between" 
                @click.prevent="triggerEvent()"
            >
                <strong>{{title.toUpperCase()}}</strong>
                <span 
                    class="down-Arrow" 
                    v-show="!active"
                >
                    &#9660;
                </span>
                <span 
                    class="up-Arrow" 
                    v-show="active"
                >
                    &#9650;
                </span>
            </a>
        </div>
        <div 
            class="tab__content p-2 flex flex-col justify-center items-center" 
            v-show="active"
        >
            <slot />
        </div>            
    </div>
</template>

<script>
export default {
    name: 'accordion',
    props: [
        'title'
    ],
    data () {
        return {
            active: false
        }
    },
    methods: {
        triggerEvent() {
            this.active = !this.active
            if(this.active) {
                this.$emit('stationSelected')
            }
        }
    }
}
</script>