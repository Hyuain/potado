import React from 'react';
import {getFriendlyDate} from '@/api/utils';
import TodoHistoryItem from '@/components/Statistics/TodoHistoryItem';
import TomatoHistoryItem from '@/components/Statistics/TomatoHistoryItem';

interface ICompletedListProps {
  tomatoData?: {
    dates: string[]
    tomatoesGroup: TomatoesGroup
  }
  todoData?: {
    dates: string[]
    todosGroup: TodosGroup
  }
}

const CompletedList = (props: ICompletedListProps) => {

  const getFriendlyTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    if (seconds < 60) return `${seconds} 秒`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} 分钟`;
    const hours = Math.floor(minutes / 60);
    return `${hours} 小时 ${Math.floor(minutes % 60)} 分钟`;
  };


  if (props.tomatoData && props.tomatoData.dates && props.tomatoData.tomatoesGroup) {
    const {dates,tomatoesGroup} = props.tomatoData;
    return (
      <div>
        {
          dates.map((date) => {
            const tomatoes = tomatoesGroup[date];
            const totalTime = tomatoes.reduce((totalTime: number, tomato: Tomato) => {
              return totalTime + Date.parse(tomato.ended_at) - Date.parse(tomato.started_at);
            }, 0);
            return (
              <div key={date} className="daily-tomatoes">
                <div className="title">
                  <p className="date">
                    <span className="date-time">{getFriendlyDate(date, 'monthAndDay')}</span>
                    <span className="week-time">{getFriendlyDate(date, 'dayOfWeek')}</span>
                  </p>
                  <p className="finished-count">完成了 {tomatoes.length} 个番茄</p>
                  <p className="total-time">总计 {getFriendlyTime(totalTime)}</p>
                </div>
                <div className="details">
                  {
                    tomatoes.map((tomato) => (
                      <TomatoHistoryItem key={tomato.id} tomato={tomato} type="finished"/>))
                  }
                </div>
              </div>
            );
          })
          })
        }
      </div>
    );
  } else if (props.todoData && props.todoData.dates && props.todoData.todosGroup) {
    const {dates,todosGroup} = props.todoData;
    return (
      <div>
        {
          dates.map((date: string) => {
            const todos = todosGroup[date];
            return (
              <div key={date} className="daily-todos">
                <div className="title">
                  <p className="date">
                    <span className="date-time">{getFriendlyDate(date, 'monthAndDay')}</span>
                    <span className="week-time">{getFriendlyDate(date, 'dayOfWeek')}</span>
                  </p>
                  <span className="finished-count">完成了 {todos.length} 个任务</span>
                </div>
                <div className="details">
                  {
                    todos.map((todo) => (<TodoHistoryItem key={todo.id} todo={todo} type="completed"/>))
                  }
                </div>
              </div>
            );
          })
        }
      </div>

    );
  } else {
    return null;
  }
};

export default CompletedList;