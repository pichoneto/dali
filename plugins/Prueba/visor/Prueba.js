import React from 'react';
import ReactDOM from 'react-dom';

export function Prueba(base) {
    return {
        getRenderTemplate: function (state) {

            //require("https://d3js.org/d3.v4.min.js");

            return "<div>pepe1</div>";

            /*var React = require('react');
            var Chart = require('react-d3-core').Chart;
            var LineChart = require('react-d3-basic').LineChart;

            var data = require('./data.json');

            return "<Chart title=\"Taiwan refuse disposal\" width=500px height=300px  ><LineChart title=\"Taiwan refuse disposal\" data='data' width=500 height=300  x='x' xScale=\"time\" />  </Chart>";
            */
        },

        afterRender: function(element, oldState) {

            var Chart = require('react-d3-core').Chart;
            var LineChart = require('react-d3-basic').LineChart;

            var data = require('../data.json');
            console.log(data);

            var chartSeries = [
            {
                field: 'BMI',
                name: 'BMI',
                color: '#ff7f0e'
            }
            ];

            var x = function(d) {
              return d.index;
          };


          
          ReactDOM.render(
            React.createElement(Chart, {
                title: "Hola",
                width: 500,
                height: 300
            }),
            element,
            function () {
                ReactDOM.render(
                    React.createElement(LineChart, {
                        showXGrid: true,
                        showYGrid: true,
                        data: data,
                        chartSeries: chartSeries,
                        x: x,
                        width: 400,
                        height: 200
                    }),
                    ReactDOM.findDOMNode(this)
                    );
                
            }
            );


          

      }
  };
}
