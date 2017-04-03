export class EventsChartsAppBarController {
    public title: string = 'Events list'
    public primaryActions: any = [{
        icon: 'icons:list',
        click: () => {
            this.$state.go('main.events.list');
        }
    }];

    constructor(
        private $state: any
    ) { }
}

export class EventsChartController {
    public constructor( ) { }

    // Format date of x axis
    public formatXTick(x) {
        let date = new Date(x);

        return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    }
}