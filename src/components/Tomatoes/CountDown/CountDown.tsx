import React from 'react';

interface ICountDownProps {
  timer: number,
}

const CountDown = (props: ICountDownProps) => {

  const [over, setOver] = React.useState<boolean>(false);

  const [time, setTime] = React.useState<any>({
    minutes: Math.floor(props.timer / (1000 * 60)),
    seconds: Math.floor(props.timer / 1000 % 60)
  });

  const getTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const tick = (timerID: NodeJS.Timeout) => {
    if (over) {
      clearInterval(timerID);
    }
    if (time.minutes === 0 && time.seconds === 0) {
      setOver(true);
    } else if (time.seconds === 0) {
      setTime({
        minutes: time.minutes - 1,
        seconds: 59
      });
    } else {
      setTime({
        minutes: time.minutes,
        seconds: time.seconds - 1
      });
    }

  };

  React.useEffect(() => {
    const timerID = setInterval(() => {
      tick(timerID);
    }, 1000);
    document.title = `${getTime(time.minutes, time.seconds)} - 有一个番茄进行中`;
    return () => clearInterval(timerID);
  });


  return (
    <div className="count-down">
      {getTime(time.minutes, time.seconds)}
    </div>
  );
};

export default CountDown;