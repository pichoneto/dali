import React from 'react';
import ReactDOM from 'react-dom';
import ReactServer from 'react-dom/server';

export function Prueba(base) {
	return {
		getRenderTemplate: function (state) {

			var Recharts = require("recharts");

			const {LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip} = Recharts;

			return ReactServer.renderToStaticMarkup(
				/* jshint ignore:start */
				<LineChart
					width={700} height={300}
					data={state.chartData}>
					<XAxis
						dataKey={state.chartXKey}
						name={state.chartXKey}/>
					<YAxis dataKey={state.chartYKey} name={state.chartYKey}/>
					<CartesianGrid
						horizontal={state.showYGrid == "checked" ? true : false}
						vertical={state.showXGrid == "checked" ? true : false} />
					<Line type="monotone"
						dataKey={state.chartYKey}
						stroke={state.chartLineColor}
						strokeDasharray="3 3" />
					<Tooltip/>
					<Legend/>
				</LineChart>
				/* jshint ignore:end */


			);

		},
		handleToolbar: function (name, value) {

			base.setState(name, value);
		}
	};


}
