import React from 'react';

interface IGraphProps {
  data: any,
  totalFinishCount: number,
  width: number,
  height: number
}

const Graph = (props: IGraphProps) => {

  console.log(props);

  const genPoints = (width: number, height: number) => {
    const dates = Object.keys(props.data).sort((a, b) => Date.parse(b) - Date.parse(a));
    console.log(dates);
    const firstDay = dates[0];
    if (firstDay) {
      const lastDay = dates[dates.length - 1];
      const range = Date.parse(lastDay) - Date.parse(firstDay);
      let finishedCount = 0;
      const pointArray = dates.map(date => {
        const x = (Date.parse(date) - Date.parse(firstDay)) / range * width;
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
    <div className="Polygon">
      <svg>
        <polygon fill="rgba(215,78,78,.1)" stroke="rgba(215,78,78,.5)" strokeWidth="1"
                 points={genPoints(props.width, props.height)}/>
      </svg>
    </div>
  );
};

export default Graph;