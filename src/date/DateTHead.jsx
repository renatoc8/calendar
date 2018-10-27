import React from 'react';
import DateConstants from './DateConstants';
import moment from 'moment';

export default
class DateTHead extends React.Component {
  render() {
    const props = this.props;
    const value = props.value;
    const localeData = value.localeData();
    const prefixCls = props.prefixCls;
    const weekDays = [];
    const firstDayOfWeek = localeData.firstDayOfWeek();
    let showWeekNumberEl;
    const now = moment();
    for (let dateColIndex = 0; dateColIndex < DateConstants.DATE_COL_COUNT; dateColIndex++) {
      const index = (firstDayOfWeek + dateColIndex) % DateConstants.DATE_COL_COUNT;
      now.day(index);
      if (props.weekDayStyle) {
		  switch (props.weekDayStyle) {
			  case "long":
				weekDays[dateColIndex] = {
				  title: localeData.weekdaysShort(now),
				  displayValue: localeData.weekdays(now),
				};
				break;
			case "short":
			  weekDays[dateColIndex] = {
				title: localeData.weekdaysShort(now),
				displayValue: localeData.weekdaysShort(now),
			  };
			  break;
			case "veryShort":
			default:
			  weekDays[dateColIndex] = {
				title: localeData.weekdaysShort(now),
				displayValue: localeData.weekdaysMin(now),
			  };
			  break;
		  }
	  } else {
	    weekDays[dateColIndex] = {
		  title: localeData.weekdaysShort(now),
		  displayValue: localeData.weekdaysMin(now),
		};
	  }
    }

    if (props.showWeekNumber) {
      showWeekNumberEl = (
        <th
          role="columnheader"
          className={`${prefixCls}-column-header ${prefixCls}-week-number-header`}
        >
          <span className={`${prefixCls}-column-header-inner`}>x</span>
        </th>);
    }
    const weekDaysEls = weekDays.map((day, xindex) => {
      return (
        <th
          key={xindex}
          role="columnheader"
          title={day.title}
          className={`${prefixCls}-column-header`}
        >
          <span className={`${prefixCls}-column-header-inner`}>
          {day.displayValue}
          </span>
        </th>);
    });
    return (<thead>
    <tr role="row">
      {showWeekNumberEl}
      {weekDaysEls}
    </tr>
    </thead>);
  }
}
