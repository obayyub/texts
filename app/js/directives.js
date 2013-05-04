'use strict';

/* Directives */

myApp.directive('uiSlider', ['ui.config', function (uiConfig) {
    'use strict';
    uiConfig.uiSlider = uiConfig.uiSlider || {};
    return {
        restrict: 'A',
        scope: {
            value: '=ngModel',
        },
        link: function (scope, elm, $attrs, uiEvent) {
            var expression,
            options = {
                range: false,
                value: scope.value,
                slide: function (event, ui) {
                    scope.$apply(function () {
                        scope.value = ui.value;
                    });
                }
            };
            if ($attrs.uiSlider) {
                expression = scope.$eval($attrs.uiSlider);
            } else {
                expression = {};
            }
            // Watch for changes in value, update all sliders bind to the same model within scope
           /* scope.$watch('value', function (newVal, oldVal) {
                if (newVal != undefined && newVal != oldVal) {
                    $('div[ng-model="' + $attrs.ngModel + '"]').slider('value', newVal);
                }
            });*/
            //Set the options from the directive's configuration
            angular.extend(options, uiConfig.devCalendar, expression);
            console.log(options);
            elm.slider(options);
        }
    };
}]);

myApp.directive('chart', function(){
    return{
        restrict: 'E',
        link: function(scope, elem, attrs){
             
            var chart = null,
                opts  = { 
                	colors: [ "0000FF" ],
                	xaxis: {
                		show: true

                	},
                	yaxis: {
                		show: true
                	},
                	grid: {
                		show: true
                	}
                };
                   
            scope.$watch(attrs.ngModel, function(data){
                var a = data.slice(0,24);
                var b = data.slice(25);
                if(!chart){
                	//console.log(b);
                    //chart = $.plot(elem, data, opts);
                    elem.show();
                    chart = $.plot(elem, [{
								   data: a,
								   lines: { show: true, fill: true }
							}, {
								   data: b,
								   points: { show: true }
							}], opts);
                    
                }else{
                	chart = $.plot(elem, [{
								   data: a,
								   lines: { show: true, fill: true }
							}, {
								   data: b,
								   points: { show: true }
							}], opts);
                    //chart.setData(data);
                    //chart.setupGrid();
                    chart.draw();
                }
            });
        }
    };
});

myApp.directive('myplate', function(){
    return{
        restrict: 'E',
        link: function(scope, elem, attrs){
              
    		var paper = new Raphael(document.getElementById('canvas_container'), 1200, 400);
    		var plate = paper.circle(275, 190, 190);
    		plate.attr({
    			stroke: '#C0C0C0',
    			'stroke-width': 3
    		});  
    		var fruits = paper.path("M 270 170 v -150 a 162.5 150 0 0 0 -162.5 150 z");
    		fruits.attr({
    			fill: '#FF0000'
    		});
    		fruits.node.onmouseover = function() {
    			this.style.cursor = 'pointer';
    		}
    		fruits.node.onclick = function () {
    			jQuery('#fruits').addClass('show');
    			jQuery('#vegetables').removeClass('show');
    			jQuery('#protein').removeClass('show');
    			jQuery('#grains').removeClass('show');
    		}
    		var vegetables = paper.path("M 270 180 h -162.5 a 162.5 175 0 0 0 162.5 175 z"); 
    		vegetables.attr({fill: '#00FF00'});
    		vegetables.node.onmouseover = function() {
    			this.style.cursor = 'pointer';
    		}
    		vegetables.node.onclick = function () {
    			jQuery('#vegetables').addClass('show');
    			jQuery('#fruits').removeClass('show');
    			jQuery('#protein').removeClass('show');
    			jQuery('#grains').removeClass('show');
    		}
    		var protein = paper.path("M 280 205 v 150 a 162.5 150 0 0 0 162.5 -150 z"); 
    		protein.attr({fill: '#FF00FF'});
    		protein.node.onmouseover = function() {
    			this.style.cursor = 'pointer';
    		}
    		protein.node.onclick = function () {
    			jQuery('#protein').addClass('show');
    			jQuery('#fruits').removeClass('show');
    			jQuery('#vegetables').removeClass('show');
    			jQuery('#grains').removeClass('show');
    		} 
    		var grains = paper.path("M 280 195 h 162.5 a 175 175 0 0 0 -162.5 -175 z"); 
    		grains.attr({fill: '#FF6600'});
    		grains.node.onmouseover = function() {
    			this.style.cursor = 'pointer';
    		}
    		grains.node.onclick = function () {
    			jQuery('#grains').addClass('show');
    			jQuery('#fruits').removeClass('show');
    			jQuery('#protein').removeClass('show');
    			jQuery('#vegetables').removeClass('show');
    		}
        }
    };
});