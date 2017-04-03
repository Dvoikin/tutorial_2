import { EventsViewModel } from './EventsViewModel';

export class EventsListAppBarController {
    public title: string = 'Events chart'
    public primaryActions: any = [{
        icon: 'icons:pie-chart',
        click: () => {
            this.$state.go('main.events.chart');
        }
    }];

    constructor(
        private $state: any
    ) { }
}

export class EventsListController {
    public constructor(
        private appEventsViewModel: EventsViewModel,
        public pipMedia: pip.layouts.IMediaService,
        private $state: ng.ui.IStateService
     ) { }

    public get events(): any[] {
        return this.appEventsViewModel.events;
    }

    public onEditEventClick(index: number) {
        this.$state.go('main.events.edit', {index: index});
    }
}