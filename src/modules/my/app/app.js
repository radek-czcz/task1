import { LightningElement } from 'lwc';

export default class App extends LightningElement {

   // objects holding entered data
   evnt = {};
   contributor = {}

   // handler for each form field's change (contributor and event)
   inputChanged(event) {
      console.log('changed');

      var contrEvMap = new Map();

      contrEvMap.set(
         document.querySelector('div').firstChild.shadowRoot.querySelector('.contributor'),
         this.contributor
      )

      contrEvMap.set(
         document.querySelector('div').firstChild.shadowRoot.querySelector('.event'),
         this.evnt
      )

      var iteratingVar;

      // parent, which is the div, holding group of event fields or holding group of contributor fields
      var divParent = event.srcElement.parentElement.parentElement;

      // all field of event group or contributor group
      var divChildren = divParent.querySelectorAll('input');

      // boolean - are all event fields (or contributor field) given?
      let allValuesGiven;

      allValuesGiven = true;
      for (iteratingVar of divChildren) {
         if (!iteratingVar.value || (iteratingVar.type == 'date' && Date.parse(iteratingVar))) {allValuesGiven = false}
      }

      //send data to main variable holding data (this.evnt or this.contributor), if all fields are entered
      if (allValuesGiven){
         for (iteratingVar of divChildren){
            contrEvMap.get(event.srcElement.parentElement.parentElement)[iteratingVar.name] = iteratingVar.value;
         }
         console.log(this.evnt)
      }
      console.log('allValuesGiven ' + allValuesGiven)
   }
}
