var React = require('react'),
		moment = require('moment')
		;

var DOM = React.DOM;
var DateTimePickerDays = React.createClass({

	render: function() {
		var date = this.props.viewDate,
				locale = date.localeData(),
				tableChildren
				;

		tableChildren = [
			DOM.thead({ key: 'th'}, [
				DOM.tr({key: 'pickers'},[
					DOM.th({ key: 'p', className: 'rdtPrev' }, DOM.button({onClick: this.props.subtractTime(1, 'months'), type: 'button' }, '‹')),
					DOM.th({ key: 's', className: 'rdtSwitch', onClick: this.props.showView('months'), colSpan: 5, 'data-value': this.props.viewDate.month() }, locale.months( date ) + ' ' + date.year() ),
					DOM.th({ key: 'n', className: 'rdtNext' }, DOM.button({onClick: this.props.addTime(1, 'months'), type: 'button' }, '›')),
				]),
				DOM.tr({ key: 'd'}, this.getDaysOfWeek( locale ).map( function( day, index ){ return DOM.th({ key: day + index, className: 'dow'}, day ); }) )
			]),
			DOM.tbody({key: 'tb'}, this.renderDays())
		];

		return DOM.div({ className: 'rdtDays' },
				DOM.table({className: 'inner-content'}, tableChildren )
		);
	},

	/**
	 * Get a list of the days of the week
	 * depending on the current locale
	 * @return {array} A list with the shortname of the days
	 */
	getDaysOfWeek: function( locale ){
		var days = locale._weekdaysMin,
				first = locale.firstDayOfWeek(),
				dow = [],
				i = 0
				;

		days.forEach( function( day ){
			dow[ (7 + (i++) - first) % 7 ] = day;
		});

		return dow;
	},

	renderDays: function() {
		var date = this.props.viewDate,
				selected = this.props.selectedDate && this.props.selectedDate.clone(),
				prevMonth = date.clone().subtract( 1, 'months' ),
				currentYear = date.year(),
				currentMonth = date.month(),
				weeks = [],
				days = [],
				renderer = this.props.renderDay || this.renderDay,
				isValid = this.props.isValidDate || this.isValidDate,
				classes, disabled, dayProps, currentDate
				;

		// Go to the last week of the previous month
		prevMonth.date( prevMonth.daysInMonth() ).startOf('week');
		var lastDay = prevMonth.clone().add(42, 'd');

		while( prevMonth.isBefore( lastDay ) ){
			classes = 'rdtDay';
			currentDate = prevMonth.clone();

			if( ( prevMonth.year() == currentYear && prevMonth.month() < currentMonth ) || ( prevMonth.year() < currentYear ) )
				classes += ' rdtOld';
			else if( ( prevMonth.year() == currentYear && prevMonth.month() > currentMonth ) || ( prevMonth.year() > currentYear ) )
				classes += ' rdtNew';

			if( selected && prevMonth.isSame( {y: selected.year(), M: selected.month(), d: selected.date()} ) )
				classes += ' rdtActive';

			if (prevMonth.isSame(moment(), 'day') )
				classes += ' rdtToday';

			disabled = !isValid( currentDate, selected );
			if( disabled )
				classes += ' rdtDisabled';

			dayProps = {
				key: prevMonth.format('M_D'),
				'data-value': prevMonth.date(),
				className: classes
			};
			if( !disabled )
				dayProps.onClick = this.props.updateSelectedDate;

			days.push( renderer( dayProps, currentDate, selected ) );

			if( days.length == 7 ){
				weeks.push( DOM.tr( {key: prevMonth.format('M_D')}, days ) );
				days = [];
			}

			prevMonth.add( 1, 'd' );
		}

		return weeks;
	},

	renderDay: function( props, currentDate, selectedDate ){
		return DOM.td( props, currentDate.date() );
	},
	isValidDate: function(){ return 1; }
});

module.exports = DateTimePickerDays;
