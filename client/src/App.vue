<template>
  <div id="app">

    <div id="header">
      <div class="pure-menu pure-menu-horizontal pure-menu-fixed">
          <a href="#" class="pure-menu-heading pure-menu-link">BRAND</a>
          <ul class="pure-menu-list">
              <li class="pure-menu-item"><a href="#" class="pure-menu-link">foo</a></li>
              <li class="pure-menu-item"><a href="#" class="pure-menu-link">count: {{cards.length}}</a></li>
              <li class="pure-menu-item"><a href="#" class="pure-menu-link" @click="addCard">add</a></li>
          </ul>
      </div>
    </div>


    
    <div id="main-packery-container">

        <div class="grid-sizer"></div>
        <div class="gutter-sizer"></div>

        <div :id="card.uuid" class="grid-item" v-for="card in cards" v-bind:key="card.uuid">
          <card-component 
            :uuid="card.uuid"
            :title="card.title"
            :isStuck="card.isStuck"
            :tags="card.tags"
            :created_at="card.created_at"
            :events="card.events"

            @toggle-stick-clicked="handleToggleStickCard"
            @remove-card-clicked="handleRemoveCard"></card-component>
        </div>

    </div><!--/#main-packery-container-->



  </div>
</template>

<script>
import CardData from './providers/CardData';
import CardComponent from './components/Card.vue';

import Packery from 'packery';
//eslint-disable-next-line
import Pure from 'purecss';



export default {
  name: 'app',

  components: {
    CardComponent
  },

  data(){
    return {
      packeryInstance: null,
      cards: [
        new CardData(),
        new CardData(),
        new CardData(),
      ]
    }
  },


  mounted(){
    this.initMainPackery();
  },

  methods: {
    initMainPackery(){
      var elem = document.querySelector('#main-packery-container');
      this.packeryInstance = new Packery( elem, {
        percentPosition: true,
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
      });
    },

    
    /**
     * Pushes a new CardData() to the cards array
     * Updates the packery layout
     */
    addCard(){
      let newCard = new CardData();
      let _self = this;
      this.cards.unshift( newCard );

      setTimeout(function(){
        let elem = document.getElementById(newCard.uuid);
        _self.packeryInstance.prepended(elem)
      }, 10);
    },

    /**
     * Removes an existing CardData() from the cards array,
     * And from the packery instance
     */
    handleRemoveCard(itemUuid){
      let _self = this;
      let elem = document.getElementById(itemUuid);

      this.packeryInstance.unstamp( elem ); // stuck items misbehave when removed
      this.packeryInstance.remove( elem );
      this.packeryInstance.layout();

      setTimeout(function(){
        _self.cards = _self.cards.filter(item => item.uuid !== itemUuid);
      }, 10);

    },
    
    /**
     * Toggles an existing CardData() 'isStuck' Boolean attribute
     * corresponding with a stuck/floating positioning in the packery layout
     */
    handleToggleStickCard(itemUuid) {
      let elem = document.getElementById(itemUuid);
      let card = this.cards.find(item => item.uuid === itemUuid);

      if (card.isStuck === true) {
        this.packeryInstance.unstamp( elem );
        card.isStuck = false;
      } else {
        this.packeryInstance.stamp( elem );
        card.isStuck = true;
      }
    },


  }

}
</script>

<style lang="scss">
  @import 'scss/app.scss';

  #app {
    height:100%;
    min-height:100vh;
    padding-top:70px;
    padding-left:25px;
    padding-right:25px;
    margin:0;
    background-color:#EBEBEB;
  }

  #header .pure-menu {
    margin-left:-25px;
    margin-right:-25px;
    padding-left:25px;
    padding-right:25px;
    padding-top:10px;
    padding-bottom:10px;
    background-color:white;

    -webkit-box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.15);
    -moz-box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.15);
    box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.15);

  }

  .gutter-sizer { 
    width: 1%; 
  }

  .grid-sizer,
  .grid-item {
    width: 19.2%;
  }




</style>
