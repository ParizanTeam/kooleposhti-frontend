import React from 'react';
import classnames from 'classnames';
import { dailyMode, DayText, monthlyMode, MonthText, yearlyMode, YearText } from './constants';
import styles from './index.styles.scss';
import { Margin } from '@mui/icons-material';
const year = 'year';
const month = 'month';
const day = 'day';

export default class Mode extends React.PureComponent {
  returnModes() {
    const { active } = this.props;
    const modes = [
      {
        id: year,
        mode: yearlyMode,
        text: YearText,
      },
      {
        id: month,
        mode: monthlyMode,
        text: MonthText,
      },
      {
        id: day,
        mode: dailyMode,
        text: DayText,
      },
    ];
    if (Array.isArray(modes) && modes.length) {
      return modes.map(mode => {
        const classNames = [styles.modeButton];
        if (mode.mode === active) {
          classNames.push(styles.modeButtonActive);
        }
        return (
          <button
            className='SaveMe'
            key={mode.id}
            onClick={() => this.props.onClick(mode.mode)}
          >
            {mode.text}
          </button>
        );
      });
    }
  }

  render() {
    return <div className='modeWrapper'>{this.returnModes()}</div>;
  }
}
