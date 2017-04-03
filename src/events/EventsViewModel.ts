import { EventModel, IoTEvent } from './EventsModel';

export class EventsViewModel {
    private _events: EventModel;

    constructor( ) {
        this._events = new EventModel();
        this._events.generateEvents();
        this._events.generateTotal();
        this._events.generateTimeSeries();
     }

     public get events(): IoTEvent[] {
         return this._events.data;
     }

     public set setIndex(index: number) {
         this._events.selectedIndex = index;
     }

     public getSelected(): IoTEvent {
         return this._events.selectedEvent;
     }

     public get editable(): IoTEvent {
         return this._events.temporary;
     }

     public updateEditable(event: IoTEvent) {
         this._events.updateTemporary(event);
     }

     public saveEdited() {
         this._events.saveTemporary();
     }

     public updateSelected(event: IoTEvent) {
         this._events.data[this._events.selectedIndex] = event;
     }
}

angular.module('app.Events')
    .service('appEventsViewModel', EventsViewModel);