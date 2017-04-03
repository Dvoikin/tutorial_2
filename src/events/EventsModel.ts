export class IoTEvent {
    public icon: string;
    public node_id: string;
    public node_name: string;
    public description: string;
    public temperature: number;
    public rad_level: number;
}

export class TotalSeries {
    public label: string;
    public value: number;
}

export class SeriesValue {
    value: number;
    x: any
}

export class TimeSeries {
    public key: string;
    public values: SeriesValue[];
}

export class EventModel {
    private _descriptions: string[] = ['Raised temperature', 'Lowered temperature', 'Change location'];
    private _icons: string[] = ['tr-errors', 'info-circle', 'location'];
    private _selectedIndex: number = 0;
    private _temporary: IoTEvent = null; // For editing

    public data: IoTEvent[] = [];
    public totalSeria: TotalSeries[] = [];
    public temperatureSeries: TimeSeries[] = [];
    public radLevelSeries: TimeSeries[] = [];
    public selectedEvent: IoTEvent;

    constructor() { }

    public get selectedIndex(): number {
        return this._selectedIndex;
    }

    public set selectedIndex(index: number) {
        this._selectedIndex = index;
        this.setSelectedEvent();
    }

    public get temporary(): IoTEvent {
        this._temporary = _.cloneDeep(this.selectedEvent);

        return this._temporary;
    }

    public updateTemporary(event: IoTEvent) {
        this._temporary = event;
    }

    public saveTemporary() {
        this.data[this._selectedIndex] = this._temporary;
        this.setSelectedEvent();
    }

    private random(min: number, max: number): number {
        return (Math.random() * (max - min) + min);
    }

    public generateEvents() {
        let events: IoTEvent[] = [],
            eventsCount = 30,
            maxTemp = 50,
            minTemp = -50,
            maxRadLev = 150,
            minRadLevel = 80,
            maxNodeNum = 15;

        for (let i = 0; i < eventsCount; i++) {
            let randType = this.random(0, this._descriptions.length - 1).toFixed(0);

            events.push({
                icon: this._icons[randType],
                node_id: this.random(0, maxNodeNum).toFixed(0),
                node_name: 'Node ' + this.random(0, maxNodeNum).toFixed(0),
                description: this._descriptions[randType],
                temperature: this.random(minTemp, maxTemp),
                rad_level: this.random(minRadLevel, maxRadLev)
            });
        }

        this.data = events;
        this.setSelectedEvent();
    }

    private setSelectedEvent() {
         this.selectedEvent = this.data[this._selectedIndex];
    }

    public generateTotal() {
        this.totalSeria = [
            {label: 'Raised temperature', value: 0},
            {label: 'Lowered temperature', value: 0},
            {label: 'Change location', value: 0}
        ];

        _.each(this.data, (event) => {
            let index = _.findIndex(this.totalSeria, (s) => { return s.label == event.description; });
            this.totalSeria[index].value++;
        })
    }

    public generateTimeSeries() {
        this.radLevelSeries = this.generateTimeSeria('rad_level');
        this.temperatureSeries = this.generateTimeSeria('temperature');
    }

    private generateTimeSeria(type: string): TimeSeries[] {
        let node_count = 2;
        let event_count = this.data.length;
        let series: TimeSeries[] = [];

        for (let i = 0; i < node_count; i++) {
            series.push({ key: 'Node ' + (i + 1), values:[] });
            for (let j = 0; j < event_count / node_count; j++) {
                series[i].values.push({
                    value: this.data[(event_count / node_count) * i + j][type], 
                    x: new Date(2016, 11, j + 1)
                });
            }
        }

        return series;
    }
}