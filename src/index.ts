'use strict';

import './nodes/nodes.ts';
import './events';
import './settings/settings_sample';
import './notifications/notifications';

import { INotificationService } from './notifications/notifications';

function configApp(
    $mdIconProvider: ng.material.IIconProvider, 
    $urlRouterProvider,
    $stateProvider,
    pipSideNavProvider: pip.nav.ISideNavProvider, 
    pipNavMenuProvider: pip.nav.INavMenuProvider, 
    pipAppBarProvider: pip.nav.IAppBarProvider, 
    pipNavIconProvider: pip.nav.INavIconProvider,
    pipActionsProvider: pip.nav.IActionsProvider, 
    pipBreadcrumbProvider: pip.nav.IBreadcrumbProvider, 
 ) {
     $stateProvider.state('main', {
         url: '',
         views: {
             'sidenav': {
                 templateUrl: 'SideNav.html',
                 controllerAs: 'vm',
                 controller: SideNavController
             }
         },
         abstract: true
     })
    $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);
    pipSideNavProvider.type = 'popup';

    pipNavMenuProvider.sections = [
        {
            name: 'main',
            links: [
                { name: 'nodes', icon: 'icons:grid', title: 'Nodes', state: 'nodes.tiles' },
                { name: 'events', icon: 'icons:progress', title: 'Events', state: 'events.list' },
                { name: 'settings', icon: 'icons:config', title: 'Settings', state: 'settings.sample' }
            ]
        },
        {
            name: 'signout',
            links: [
                { name: 'signout', icon: 'icons:exit', title: 'Sign out', event: 'appSignout' }
            ]
        }
    ];

    // Configure appbar    
    pipBreadcrumbProvider.text = "Sample Application";
    pipNavIconProvider.setMenu();
    pipActionsProvider.primaryGlobalActions = [
            { name: 'global.notifications', icon: 'icons:bell', count: 0, event: 'appNotificationsClicked', subActions: []  }
    ];

    pipActionsProvider.secondaryGlobalActions = [
        { name: 'global.settings', title: 'Settings', state: 'settings.sample', subActions: [] },
        { name: 'global.signout', title: 'Sign out', event: 'appSignout', subActions: [] }
    ];
    pipAppBarProvider.parts = {icon: true, title: 'breadcrumb', actions: 'primary', menu: true };

    $urlRouterProvider.otherwise("/nodes/tiles");
}

class SideNavController {
    public links: any = [
        { name: 'nodes', icon: 'icons:grid', title: 'Nodes', state: 'main.nodes.tiles' },
        { name: 'events', icon: 'icons:progress', title: 'Events', state: 'main.events.list' }
    ];

    constructor(
        private pipSideNav: pip.nav.ISideNavService,
        private $state: angular.ui.IStateService
    ) {  }

    public onLinkClick(state) {
        this.pipSideNav.close();
        this.$state.go(state);
    }
}

class AppController {
    public constructor(
        notificationService: INotificationService
    ) {
        notificationService.start();
    }
};

angular
    .module('app', [
        'ngMaterial',
        'pipLayout', 
        'pipNav', 
        'pipControls',
        'pipBehaviors',
        'pipServices', 
        'pipTheme',
        'pipSettings',
        'pipButtons',
        'pipLocations',
        'pipCharts',
        'pipCharts.Templates',

        'app.Templates',
        'app.Events',
        'app.Nodes',
        'app.Settings.Sample',
        'app.Notifications'
    ])
    .config(configApp)
    .controller('appController', AppController);