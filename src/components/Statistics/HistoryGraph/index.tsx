import React from 'react';

interface IGraphProps {
  data: TomatoesGroup | TodosGroup,
  totalFinishCount: number,
  width: number,
  height: number
}

const Graph = (props: IGraphProps) => {

  const genPoints = (width: number, height: number) => {
    const dates = Object.keys(props.data).sort((a, b) => Date.parse(a) - Date.parse(b));
    const firstDay = Date.parse(dates[0]) - 24 * 60 * 60 * 1000;
    if (firstDay) {
      const lastDay = new Date().getTime();
      const range = lastDay - firstDay;
      let finishedCount = 0;
      const pointArray = dates.map(date => {
        let x = (Date.parse(date) - firstDay) / range * width;
        if (range === 0) {
          x = width;
        }
        finishedCount += props.data[date].length;
        const y = (1 - finishedCount / props.totalFinishCount) * height;
        return `${x},${y}`;
      });
      return [`0,${height}`, ...pointArray, `${width},0`,`${width},${height}`].join(' ');
    } else {
      return `0,${height} ${width},${height}`;
    }
  };

  return (
    <div className="graph">
      <svg>
        <polygon fill="rgba(201,72,91,.1)" stroke="rgba(201,72,91,.5)" strokeWidth="1"
                 points={genPoints(props.width, props.height)}/>
      </svg>
    </div>
  );
};

export default Graph;