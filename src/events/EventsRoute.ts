import { EventsMainController } from './MainController';
import { EventsListAppBarController, EventsListController } from './EventsList';
import { EventsChartsAppBarController, EventsChartController } from './EventsCharts';
import { EventsEditAppBarController, EventsEditController } from './EventsEdit';

function configureEventRoutes(
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";

    // Configure module routes
    $stateProvider.state('main.events', {
        url: '/events',
        views: {
            '@': {
                controller: EventsMainController,
                controllerAs: 'eventMain',
                template: '<div ui-view="main" class="layout-row flex w-stretch"></div>'
            }
        },
        abstract: true
    })
    .state('main.events.list', {
        url: '/list',
        views: {
            'appbar@': {
                templateUrl: 'events/EventsAppbar.html',
                controllerAs: 'vm',
                controller: EventsListAppBarController
            },
            'main': {
                controller: EventsListController,
                controllerAs: 'vm',
                templateUrl: 'events/EventsList.html'
            }
        }
    })
    .state('main.events.chart', {
        url: '/chart',
        views: {
            'appbar@': {
                templateUrl: 'events/EventsAppbar.html',
                controllerAs: 'vm',
                controller: EventsChartsAppBarController
            },
            'main': {
                controller: EventsChartController,
                controllerAs: 'vm',
                templateUrl: 'events/EventsCharts.html'
            }
        }
    })
    .state('main.events.edit', {
        url: '/edit?index',
        views: {
            'appbar@': {
                templateUrl: 'events/EventsAppbar.html',
                controllerAs: 'vm',
                controller: EventsEditAppBarController
            },
            'main': {
                controller: EventsEditController,
                controllerAs: 'vm',
                templateUrl: 'events/EventsEdit.html'
            }
        }
    })
}

angular
    .module('app.Events')
    .config(configureEventRoutes);