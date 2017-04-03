'use strict';

function configureNodeRoutes(
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";

    // Configure module routes
    $stateProvider.state('main.nodes', {
            url: '/nodes',
            views: {
                'appbar': {
                    template: '<p>Nodes</p>'
                },
                '@': {
                    controller: NodesController,
                    controllerAs: 'vm',
                    template: '<div ui-view="main" class="layout-row flex w-stretch"></div>'
                }
            },
            abstract: true
        })
        .state('main.nodes.tiles', {
            url: '/tiles',
            views: {
                'appbar@': {
                    templateUrl: 'nodes/nodes_appbar.html',
                    controllerAs: 'vm',
                    controller: NodesTilesAppBarController
                },
                'main': {
                    controller: NodesTilesController,
                    templateUrl: 'nodes/nodes_tiles.html'
                }
            }
        })
        .state('main.nodes.map', {
            url: '/map',
            views: {
                'appbar@': {
                    templateUrl: 'nodes/nodes_appbar.html',
                    controllerAs: 'vm',
                    controller: NodesMapAppBarController
                },
                'main': {
                    controller: NodesMapController,
                    templateUrl: 'nodes/nodes_map.html'
                }
            }
        });
}

class Point {
    type: string;
    coordinates: number[];
}

class IoTNode {
    public name: string;
    public temperature: number;
    public radiation_level: number;
    public location: Point;
}

class NodesTilesAppBarController {
    public title: string = 'Nodes tiles';
    public primaryActions: any = [{
        icon: 'icons:location',
        click: () => {
            this.$state.go('main.nodes.map');
        }
    }];

    constructor(
        private $state: any
    ) {}
}

class NodesMapAppBarController {
    public title: string = 'Nodes map';
    public primaryActions: any = [{
        icon: 'icons:grid',
        click: () => {
            this.$state.go('main.nodes.tiles');
        }
    }];

    constructor(
        private $state: any
    ) {}
}

class NodesController {
    public constructor(
        pipBreadcrumb: pip.nav.IBreadcrumbService
    ) {
        pipBreadcrumb.text = "Nodes";

        this.nodes = [{
                name: 'Node 1',
                temperature: 24,
                radiation_level: 100,
                location: {
                    type: 'Point',
                    coordinates: [32.393603, 110.982593]
                }
            },
            {
                name: 'Node 1',
                temperature: 24.5,
                radiation_level: 104,
                location: {
                    type: 'Point',
                    coordinates: [32.393603, -121.982593]
                }
            },
            {
                name: 'Node 3',
                temperature: 23,
                radiation_level: 99,
                location: {
                    type: 'Point',
                    coordinates: [32.393603, 120.982593]
                }
            }
        ];

        this.locationPoints = [
            this.nodes[0].location,
            this.nodes[1].location,
            this.nodes[2].location
        ];
    }

    public nodes: IoTNode[] = [];
    public locationPoints: Point[] = [];
}

class NodesTilesController {
    public constructor() { }
}

class NodesMapController {
    public constructor() {}
}

angular
    .module('app.Nodes', [])
    .config(configureNodeRoutes)
    .controller('nodesController', NodesController)
    .controller('nodesTilesController', NodesTilesController)
    .controller('nodesMapController', NodesMapController);