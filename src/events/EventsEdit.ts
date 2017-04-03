import { EventsViewModel } from './EventsViewModel';

export class EventsEditAppBarController {
    public navIcon: any = {
        icon: 'icons:arrow-left',
        click: () => {
            this.$state.go('main.events.list');
        }
    };
    public title: string = this.appEventsViewModel.getSelected().node_name;
    public primaryActions: any = [{
        icon: 'icons:disk',
        click: () => {
            this.appEventsViewModel.saveEdited();
            this.$state.go('main.events.list');
        }
    }];

    constructor(
        private $state: ng.ui.IStateService,
        private appEventsViewModel: EventsViewModel
    ) { }
}

export class EventsEditController {
    public event: any;

    constructor(
        private appEventsViewModel: EventsViewModel,
        private $state: ng.ui.IStateService,
    ) {
        $state.params['index'] ? this.appEventsViewModel.setIndex = $state.params['index'] : $state.go('main.events.list');

        this.event = this.appEventsViewModel.editable;
    }

    public onChangeEvent() {
        this.appEventsViewModel.updateEditable(this.event);
    }
    
}