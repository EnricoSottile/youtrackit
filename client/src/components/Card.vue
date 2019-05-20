<template>

    <div :class="heightClass">
        <h2>{{ getCardTitle }}</h2>
        <time>{{ getDate }}</time>
        <br/>

        <button id="removeButton" @click.prevent="removeCard"> Rimuovi</button> 
        <br>
        <button id="stickButton" @click.prevent="toggleStickPosition">
            {{ isStuck === true ? 'sblocca' : 'fissa'}}    
        </button>    
    </div>
    
</template>

<script>
export default {
    
    props: {
        uuid: String,
        title: String,
        isStuck: Boolean,
        tags: Array,
        created_at: Date,
        events: Array,
    },

    data(){
        return {
            heightClass: '',
        };
    },

    created(){
        this.heightClass = this.getClass();
    },

    computed: {
        getCardTitle(){
            return this.title.length ? this.title : '...';
        },
        getDate(){
            return this.created_at.toLocaleTimeString();
        }
    },

    methods: {
        getClass(){
            let classes = ['', 'height-2', 'height-3']; 
            let heightClass = classes[Math.floor(Math.random() * classes.length)];
            return `card ${heightClass}`;
        },
        removeCard(){
            this.$emit('remove-card-clicked', this.uuid);
        },
        toggleStickPosition(){
            this.$emit('toggle-stick-clicked', this.uuid);
        },

    }



}
</script>


<style lang="scss" scoped>


    .card {
        height:200px;
        background-color:white;
        width:100%;
        border-radius: 10px;
        border: 1px solid transparent;
        padding:15px;
        box-sizing: border-box;

        -webkit-box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.15);
        -moz-box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.15);
        box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.15);
    }


    .height-2 {
        height:350px;
    }

    .height-3 {
        height:500px;
    }
</style>


