'use strict';

var React = require('react'),
	createClass = require('create-react-class')
;

var DateTimePickerMonths = createClass({
	render: function() {
		return React.createElement('div', { className: 'rdtMonths'},[
			React.createElement('table', { key: 'a'}, React.createElement('thead', {className: 'inner-content'}, [
			React.createElement('tr', {},[
				React.createElement('th', { key: 'prev', className: 'rdtPrev' }, React.createElement('div', {onClick: this.props.subtractTime(1, 'years')}, '‹')),
				React.createElement('th', { key: 'year', className: 'rdtSwitch', onClick: this.props.showView('years'), colSpan: 2, 'data-value': this.props.viewDate.year()}, this.props.viewDate.year() ),
				React.createElement('th', { key: 'next', className: 'rdtNext' }, React.createElement('div', {onClick: this.props.addTime(1, 'years')}, '›'))
			])])),
      React.createElement('table', { key: 'months', className: 'inner-content'}, React.createElement('tbody', { key: 'b'}, this.renderMonths()))
		]);
	},

	renderMonths: function() {
		var date = this.props.selectedDate,
			month = this.props.viewDate.month(),
			year = this.props.viewDate.year(),
			rows = [],
			i = 0,
			months = [],
			renderer = this.props.renderMonth || this.renderMonth,
			classes, props
		;

		while (i < 12) {
			classes = "rdtMonth";
			if( date && i === month && year === date.year() )
				classes += " rdtActive";

			props = {
				key: i,
				'data-value': i,
				className: classes,
				onClick: this.props.setDate('month')
			};

			months.push( renderer( props, i, year, date && date.clone() ));

			if( months.length == 4 ){
				rows.push( React.createElement('tr', { key: month + '_' + rows.length }, months) );
				months = [];
			}

			i++;
		}

		return rows;
	},

	renderMonth: function( props, month, year, selectedDate ) {
		return React.createElement('td',  props, this.props.viewDate.localeData()._monthsShort[ month ] );
	}
});

module.exports = DateTimePickerMonths;
