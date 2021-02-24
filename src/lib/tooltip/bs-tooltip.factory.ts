/*
 * Twitter Bootstrap 4 plugin for AngularJS.
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import IInjectorService = angular.auto.IInjectorService;
import {IDirective} from 'angular';
import {BsTooltipToggleDirectiveController} from './bs-tooltip-toggle.directive';

export class BsTooltipFactory {
    private $injector: IInjectorService;

    constructor($injector: IInjectorService) {
        this.$injector = $injector;
    }

    customBindingDirective(): IDirective {
        return {
            restrict: 'A',
            require: '?^bsTooltipBoundary',
            compile: (element, attrs) => {
                if (!('bsTooltipToggle' in attrs) && !('bsPopoverToggle' in attrs)) {
                    return (scope, element, attrs, ctrl) => {
                        const directive = this.$injector.get('bsTooltipToggleDirective')[0],
                            bsTooltipToggleCtrl = this.$injector.instantiate(directive.controller, {
                                '$scope': scope,
                                '$element': element,
                                '$attrs': attrs
                            }) as BsTooltipToggleDirectiveController;
                        directive.compile(
                            element, scope, attrs, [ctrl, bsTooltipToggleCtrl]
                        )(
                            scope, element, attrs, [ctrl, bsTooltipToggleCtrl]
                        );
                        bsTooltipToggleCtrl.$onInit();
                        element.on('$destroy', function() {
                            bsTooltipToggleCtrl.$onDestroy();
                        });
                    }
                }
            }
        }
    }
}
