import React from 'react';

interface ICountDownProps {
  timer: number,
}

const CountDown = (props: ICountDownProps) => {

  const [over, setOver] = React.useState(false);

  const [time, setTime] = React.useState({
    minutes: Math.floor(props.timer / (1000 * 60)),
    seconds: Math.floor(props.timer / 1000 % 60)
  });

  const tick = () => {
    if (over) return;
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
    let timerID = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(timerID)
  });


  return (
    <div className="count-down">
      {`${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}
    </div>
  );
};

export default CountDown;