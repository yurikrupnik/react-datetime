'use strict';

var React = require('react');
var createClass = require('create-react-class');

var DOM = require('react-dom');
var DateTimePickerYears = createClass({
	render: function() {
		var year = parseInt(this.props.viewDate.year() / 10, 10) * 10;

		return React.createElement('div', { className: 'rdtYears'},[
			React.createElement('table', { key: 'a'}, React.createElement('thead', {className: 'inner-content'}, [
				React.createElement('tr', {},[
				React.createElement('th', { key: 'prev', className: 'rdtPrev' }, React.createElement('div', {onClick: this.props.subtractTime(10, 'years') }, '‹')),
				React.createElement('th', { key: 'year', className: 'rdtSwitch', onClick: this.props.showView('years'), colSpan: 2 }, year + '-' + (year + 9) ),
				React.createElement('th', { key: 'next', className: 'rdtNext'}, React.createElement('div', {onClick: this.props.addTime(10, 'years') }, '›'))
				])])),
			React.createElement('table', { key: 'years', className: 'inner-content'}, React.createElement('tbody', {}, this.renderYears( year )))
		]);
	},

	renderYears: function( year ) {
		var years = [],
			i = -1,
			rows = [],
			renderer = this.props.renderYear || this.renderYear,
			selectedDate = this.props.selectedDate,
			classes, props
		;

		year--;
		while (i < 11) {
			classes = 'rdtYear';
			if( i === -1 | i === 10 )
				classes += ' rdtOld';
			if( selectedDate && selectedDate.year() === year )
				classes += ' rdtActive';

			props = {
				key: year,
				'data-value': year,
				className: classes,
				onClick: this.props.setDate('year')
			};

			years.push( renderer( props, year, selectedDate && selectedDate.clone() ));

			if( years.length == 4 ){
				rows.push( React.createElement('tr', { key: i }, years ) );
				years = [];
			}

			year++;
			i++;
		}

		return rows;
	},

	renderYear: function( props, year, selectedDate ){
		return React.createElement('td',  props, year );
	}
});

module.exports = DateTimePickerYears;
