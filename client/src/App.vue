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


    
    <div id="main-cards-container">

        <div class="grid-sizer"></div>
        <div class="gutter-sizer"></div>

        <div :id="card.uuid" class="grid-item draggable-item" v-for="card in cards" v-bind:key="card.uuid">
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

    </div><!--/#main-cards-container-->



  </div>
</template>

<script>
import CardData from './providers/CardData';
import CardComponent from './components/Card.vue';

import Packery from 'packery';
import Draggabilly from 'draggabilly';
//eslint-disable-next-line
import Pure from 'purecss';



export default {
  name: 'app',

  components: {
    CardComponent
  },

  data(){
    return {
      draggableList: [],
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
    this.initMainDraggabilly();
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
    initMainDraggabilly(){
      let draggableElems = document.querySelectorAll('.draggable-item');
      draggableElems.forEach(val => {
        this.addToDraggabilly(val);
      })
    },
    addToDraggabilly(nodeElem){
      let draggie = new Draggabilly( nodeElem, {
        containment: '#main-cards-container',
        handle: '.draggabilly-handle'
      });

      this.packeryInstance.bindDraggabillyEvents( draggie )
      this.draggableList.push(draggie);
    },


    
    /**
     * Pushes a new CardData() to the cards array
     * Updates the packery layout
     */
    addCard(){
      let _self = this;
      let newCard = new CardData();
      this.cards.unshift( newCard );

      setTimeout(function(){
        let elem = document.getElementById(newCard.uuid);
        _self.packeryInstance.prepended(elem)
        _self.addToDraggabilly(elem)
      }, 10);
    },

    /**
     * Removes an existing CardData() from the cards array,
     * And from the packery instance
     * Also clean draggabilly list
     */
    handleRemoveCard(itemUuid){
      let _self = this;
      let elem = document.getElementById(itemUuid);

      this.packeryInstance.unstamp( elem ); // stuck items misbehave when removed
      this.packeryInstance.remove( elem );
      this.packeryInstance.layout();

      this.draggableList.filter(item => item.element.id !== itemUuid);

      setTimeout(function(){ // timeout for animation
        _self.cards = _self.cards.filter(item => item.uuid !== itemUuid);
      }, 200);

    },
    
    /**
     * Toggles an existing CardData() 'isStuck' Boolean attribute
     * corresponding with a stuck/floating positioning in the packery layout
     * and also with the draggabilly plugin
     */
    handleToggleStickCard(itemUuid) {
      let elem = document.getElementById(itemUuid);
      let draggable = this.draggableList.find(item => item.element.id === itemUuid);
      let card = this.cards.find(item => item.uuid === itemUuid);

      if (card.isStuck === true) {
        this.packeryInstance.unstamp( elem );
        draggable && draggable.enable();
        card.isStuck = false;
      } else {
        this.packeryInstance.stamp( elem );
        draggable && draggable.disable();
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


.packery-drop-placeholder {
  outline: 3px dashed #444;
  outline-offset: -6px;
  /* transition position changing */
  -webkit-transition: -webkit-transform 0.2s;
          transition: transform 0.2s;
}


</style>
