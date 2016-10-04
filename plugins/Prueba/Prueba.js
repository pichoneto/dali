import React from 'react';
import ReactDOM from 'react-dom';
import ReactServer from 'react-dom/server';

export function Prueba(base) {
    return {
        getConfig: function () {
            return {
                name: 'Prueba',
                displayName: "Prueba",
                category: 'text',
                needsConfigModal: false,
                needsTextEdition: false,
                icon: 'format_color_text'
            };
        },
        getToolbar: function () {
            return {
                main: {
                    __name: "Main",
                    accordions: {
                        style: {
                            __name: "Style",
                            icon: 'palette',
                            buttons: {
                                padding: {
                                    __name: 'Padding',
                                    type: 'number',
                                    value: '15px',
                                    min: 0,
                                    max: 100,
                                    units: 'px'
                                },
                                borderWidth: {
                                    __name: "BorderWidth",
                                    type: 'number',
                                    value: '0px',
                                    min: 0,
                                    max: 10,
                                    units: 'px'
                                },
                                borderStyle: {
                                    __name: "BorderStyle",
                                    type: 'select',
                                    value: 'solid',
                                    options: ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial', 'inherit']
                                },
                                borderColor: {
                                    __name: "BorderColor",
                                    type: 'color',
                                    value: '#000000'
                                },
                                borderRadius: {
                                    __name: "BorderRadius",
                                    type: 'number',
                                    value: '0%',
                                    min: '0',
                                    max: '50',
                                    step: '5',
                                    units: '%'
                                },
                                opacity: {
                                    __name: "Opacity",
                                    type: 'range',
                                    value: 1,
                                    min: 0,
                                    max: 1,
                                    step: 0.01
                                }
                            }
                        },
                        '~extra': {
                            icon: 'rate_review',
                            __name: "Alias",
                            buttons: {}
                        }
                    }
                }
            };
        },
        getRenderTemplate: function (state) {

            //require("https://d3js.org/d3.v4.min.js");

            return this.generateMarkup(state);

            /*var React = require('react');
            var Chart = require('react-d3-core').Chart;
            var LineChart = require('react-d3-basic').LineChart;

            var data = require('./data.json');

            return "<Chart title=\"Taiwan refuse disposal\" width=500px height=300px  ><LineChart title=\"Taiwan refuse disposal\" data='data' width=500 height=300  x='x' xScale=\"time\" />  </Chart>";
            */
        },

        generateMarkup: function(state) {

            var Chart = require('react-d3-core').Chart;
            var LineChart = require('react-d3-basic').LineChart;

            var chartData = require('./data.json');
            console.log(chartData);

            var width = 700,
            height = 300,
            margins = {left: 100, right: 100, top: 50, bottom: 50},
            title = "User sample",
            chartSeries = [
            {
                field: 'BMI',
                name: 'BMI',
                color: '#ff7f0e'
            }
            ],
            x = function(d) {
              return d.index;
          },
          xScale = 'time';

          return ReactServer.renderToStaticMarkup(
            /* jshint ignore:start */
            <LineChart
            margins= {margins}
            data={chartData}
            width={width}
            height={height}
            chartSeries={chartSeries}
            x={x}
            xScale={xScale}
            />
            /* jshint ignore:end */
            );
        }
    };
}
