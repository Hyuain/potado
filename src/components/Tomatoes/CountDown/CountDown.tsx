import React from 'react';

interface ICountDownProps {
  timer: number,
  onFinish: () => void
}

interface IContDownStates {
  over: boolean,
  minutes: number,
  seconds: number
}

let timerID: NodeJS.Timeout;

class CountDown extends React.Component <ICountDownProps, IContDownStates> {

  constructor(props: ICountDownProps) {
    super(props);
    this.state = {
      over: false,
      minutes: Math.floor(props.timer / (1000 * 60)),
      seconds: Math.floor(props.timer / 1000 % 60)
    };
  }

  get countDown () {
    return `${this.state.minutes.toString().padStart(2, '0')}:${this.state.seconds.toString().padStart(2, '0')}`;
  };

  tick = () => {
    const {over, minutes, seconds} = this.state;
    if (over) {
      this.props.onFinish();
      clearInterval(timerID);
    }
    if (minutes === 0 && seconds === 0) {
      this.setState({over: true});
    } else if (seconds === 0) {
      this.setState({
        minutes: minutes - 1,
        seconds: 59
      });
    } else {
      this.setState({
        minutes: minutes,
        seconds: seconds - 1
      });
    }
  };

  componentDidMount(): void {
    timerID = setInterval(() => {
      this.tick();
      document.title = `${this.countDown} - 有一个番茄正在进行`;
    }, 1000);
  }

  componentWillUnmount(): void {
    this.props.onFinish();
    clearInterval(timerID)
  }

  public render() {
    return (
      <div className="count-down">
        {this.countDown}
      </div>
    );
  }
}

export default CountDown;