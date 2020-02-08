import React from 'react';
import './CountDown.less';

interface ICountDownProps {
  restTime: number,
  duration: number,
  onFinish: () => void
}

interface IContDownStates {
  restTime: number
}

let timerID: NodeJS.Timeout;

class CountDown extends React.Component <ICountDownProps, IContDownStates> {

  constructor(props: ICountDownProps) {
    super(props);
    this.state = {
      restTime: this.props.restTime
    };
  };

  componentDidMount(): void {
    this.startCountDown();
  };

  componentWillUnmount(): void {
    this.onTimeOver();
  };

  get clock() {
    const minutes = Math.floor(this.state.restTime / 1000 / 60);
    const seconds = Math.floor(this.state.restTime / 1000 % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  startCountDown = () => {
    timerID = setInterval(() => {
      const restTime = this.state.restTime;
      this.setState({restTime: restTime - 1000});
      document.title = `${this.clock} - 有一个番茄正在进行`;
      if (restTime < 1000) {
        this.onTimeOver();
      }
    }, 1000);
  };

  onTimeOver = () => {
    this.props.onFinish();
    clearInterval(timerID);
  };

  public render() {
    const percent = 1 - this.state.restTime / this.props.duration;
    return (
      <div className="count-down">
        <span>{this.clock}</span>
        <div className="progress-bar" style={{width: `${percent * 100}%`}}></div>
      </div>
    );
  }
}

export default CountDown;