import React from 'react';
import {format} from 'date-fns';

interface IGraphProps {
  data: any,
  totalFinishCount: number,
  width: number,
  height: number
}

const Graph = (props: IGraphProps) => {

  const genPoints = (width: number, height: number) => {
    const dates = Object.keys(props.data).sort((a, b) => Date.parse(a) - Date.parse(b));
    const firstDay = dates[0];
    if (firstDay) {
      const lastDay = format(new Date(), 'yyyy-MM-dd');
      const range = Date.parse(lastDay) - Date.parse(firstDay);
      let finishedCount = 0;
      const pointArray = dates.map(date => {
        let x = (Date.parse(date) - Date.parse(firstDay)) / range * width;
        if (range === 0) {
          x = width;
        }
        finishedCount += props.data[date].length;
        const y = (1 - finishedCount / props.totalFinishCount) * height;
        return `${x},${y}`;
      });
      return [`0,${height}`, ...pointArray, `${width},${height}`].join(' ');
    } else {
      return `0,${height} ${width},${height}`;
    }
  };

  return (
    <div className="graph">
      <svg>
        <polygon fill="rgba(215,78,78,.1)" stroke="rgba(215,78,78,.5)" strokeWidth="1"
                 points={genPoints(props.width, props.height)}/>
      </svg>
    </div>
  );
};

export default Graph;