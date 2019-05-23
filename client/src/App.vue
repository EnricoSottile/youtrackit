<template>
  <div id="app">

    <div id="header">
      <div class="pure-menu pure-menu-horizontal pure-menu-fixed">
          <a href="#" class="pure-menu-heading pure-menu-link">BRAND</a>
          <ul class="pure-menu-list">
              <li class="pure-menu-item"><a href="#" class="pure-menu-link">foo</a></li>
              <li class="pure-menu-item"><a href="#" class="pure-menu-link" @click="addCard">add</a></li>
          </ul>
      </div>
    </div>


    
    <div id="main-cards-container">

        <div class="grid-sizer"></div>
        <div class="gutter-sizer"></div>

        <div :id="card.uuid" class="grid-item draggable-item" v-for="card in dashboard.cards" v-bind:key="card.uuid">
          <card-component 
            :uuid="card.uuid"
            :title="card.title"
            :isFavourite="card.isFavourite"
            :tags="card.tags"
            :created_at="card.created_at"
            :events="card.events"

            @toggle-favourite-clicked="handleToggleFavouriteCard"
            @remove-card-clicked="handleRemoveCard"></card-component>
        </div>

    </div><!--/#main-cards-container-->



  </div>
</template>

<script>
import Dashboard from './classes/DashboardClass';
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
      dashboard: new Dashboard(),
    }
  },


  mounted(){
    this.initMainPackery();
  },

  methods: {
    initMainPackery(){
      var elem = document.querySelector('#main-cards-container');
      this.packeryInstance = new Packery( elem, {
        percentPosition: true,
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
      });
    },


    
    /**
     * Add a new card and
     * Updates the packery layout
     */
    addCard(){
      let _self = this;
      let newCard = this.dashboard.addCard();

      setTimeout(function(){
        let elem = document.getElementById(newCard.uuid);
        _self.packeryInstance.prepended(elem)
      }, 10);
    },

    /**
     * Removes the card from the dashboard
     * And from the packery instance
     */
    handleRemoveCard(itemUuid){
      let _self = this;
      let elem = document.getElementById(itemUuid);

      this.packeryInstance.remove( elem );
      this.packeryInstance.layout();

      setTimeout(function(){ // timeout for animation
        _self.dashboard.removeCardById(itemUuid);
      }, 200);

    },
    
    /**
     * Toggles an existing CardData() 'isFavourite' Boolean attribute (API)
     */
    handleToggleFavouriteCard(itemUuid) {
      let card = this.dashboard.getCardById(itemUuid);
      card.toggleFavouriteStatus();
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


.packery-drop-placeholder {
  outline: 3px dashed #444;
  outline-offset: -6px;
  /* transition position changing */
  -webkit-transition: -webkit-transform 0.2s;
          transition: transform 0.2s;
}


</style>
