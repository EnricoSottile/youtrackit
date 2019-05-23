<template>

    <div :class="heightClass">
        <input 
            type="text" 
            :value="title" @input="$emit('update:title', $event.target.value)" 
            placeholder="add a title">

        <time>{{ getDate }}</time>
        <br/>

        <button id="removeButton" @click.prevent="removeCard"> Rimuovi</button> 
        <br>
        <button id="favouriteButton" @click.prevent="toggleIsFavourite">
            {{ isFavourite === true ? 'unfav' : 'fav'}}    
        </button>   

        <button id="stickButton" @click.prevent="toggleStickPosition">
            {{ isStuck === true ? 'sblocca' : 'fissa'}} </button>

        <button id="addEvent" @click.prevent="addEvent">
            {{ events.length }}
        </button>    

        <ul>
            <li v-for="event in getLatestEvents" :key="event.uuid">
                <input 
                type="text" 
                :value="event.description" @input="emitEventUpdate($event.target.value, event.uuid)"
                placeholder="add a description">
            </li>
        </ul>

    </div>
    
</template>

<script>
export default {
    
    props: {
        uuid: String,
        title: String,
        isStuck: Boolean,
        isFavourite: Boolean,
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
        getDate(){
            return this.created_at.toLocaleTimeString();
        },
        getLatestEvents(){
            // rimanda gli ultimi 3 eventi inseriti
            return this.events.slice().reverse().splice(0,3);
        },
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
        toggleIsFavourite(){
            this.$emit('toggle-favourite-clicked', this.uuid);
        },
        addEvent(){
            this.$emit('add-event-clicked', this.uuid);
        },
        emitEventUpdate(value, eventUuid){
            this.$emit('event-update', {
                key: 'description',
                value: value,
                cardUuid: this.uuid, 
                eventUuid: eventUuid,
            });
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


