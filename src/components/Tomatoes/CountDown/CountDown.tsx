import React from 'react';
import './CountDown.less'

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
  }

  get countDown() {
    const minutes = Math.floor(this.state.restTime / 1000 / 60);
    const seconds = Math.floor(this.state.restTime / 1000 % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  componentDidMount(): void {
    timerID = setInterval(() => {
      const restTime = this.state.restTime;
      this.setState({restTime: restTime - 1000});
      document.title = `${this.countDown} - 有一个番茄正在进行`;
      if (restTime < 1000) {
        this.props.onFinish();
        clearInterval(timerID);
      }
    }, 1000);
  }

  componentWillUnmount(): void {
    this.props.onFinish();
    clearInterval(timerID);
  }

  public render() {
    const percent = 1 - this.state.restTime / this.props.duration;
    return (
      <div className="count-down">
        <span>{this.countDown}</span>
        <div className="progress-bar" style={{width: `${percent * 100}%`}}></div>
      </div>
    );
  }
}

export default CountDown;