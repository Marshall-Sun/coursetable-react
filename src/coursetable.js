import React from "react";
import "./coursetable.css";
import { Cascader, Table } from "antd";
const { Column } = Table;

class Coursetable extends React.Component {
  constructor() {
    super();
    this.state = {
      options: [],
      myCourse: [],
      week: this.initWeek(),
      data: [
        { key: 1, Sun: {}, Mon: {}, Tue: {}, Wed: {}, Tur: {}, Fri: {}, Sat: {} },
        { key: 2, Sun: {}, Mon: {}, Tue: {}, Wed: {}, Tur: {}, Fri: {}, Sat: {} },
        { key: 3, Sun: {}, Mon: {}, Tue: {}, Wed: {}, Tur: {}, Fri: {}, Sat: {} },
        { key: 4, Sun: {}, Mon: {}, Tue: {}, Wed: {}, Tur: {}, Fri: {}, Sat: {} },
        { key: 5, Sun: {}, Mon: {}, Tue: {}, Wed: {}, Tur: {}, Fri: {}, Sat: {} },
        { key: 6, Sun: {}, Mon: {}, Tue: {}, Wed: {}, Tur: {}, Fri: {}, Sat: {} },
      ],
    };
  }

  componentDidMount() {
    fetch("https://cdn.jsdelivr.net/gh/marshall-sun/CDN@latest/coursetable/semesterList.json")
      .then((res) => res.json())
      .then((data) => this.setState({ options: data }));
    fetch("https://cdn.jsdelivr.net/gh/marshall-sun/CDN@latest/coursetable/myCourse.json")
      .then((res) => res.json())
      .then((data) => this.setState({ myCourse: data }, () => this.onChange(this.state.week)));
  }

  onChange = (newWeek) => {
    let newData = [
      { key: 1, Sun: {}, Mon: {}, Tue: {}, Wed: {}, Tur: {}, Fri: {}, Sat: {} },
      { key: 2, Sun: {}, Mon: {}, Tue: {}, Wed: {}, Tur: {}, Fri: {}, Sat: {} },
      { key: 3, Sun: {}, Mon: {}, Tue: {}, Wed: {}, Tur: {}, Fri: {}, Sat: {} },
      { key: 4, Sun: {}, Mon: {}, Tue: {}, Wed: {}, Tur: {}, Fri: {}, Sat: {} },
      { key: 5, Sun: {}, Mon: {}, Tue: {}, Wed: {}, Tur: {}, Fri: {}, Sat: {} },
      { key: 6, Sun: {}, Mon: {}, Tue: {}, Wed: {}, Tur: {}, Fri: {}, Sat: {} },
    ];

    for (let course of this.state.myCourse) {
      if (
        course.year === newWeek[0] &&
        course.semester === newWeek[1] &&
        course.week.indexOf(newWeek[2]) !== -1
      ) {
        let courseTime = Math.floor(course.time.split("-")[0] / 2);
        switch (course.day) {
          case 0:
            newData[courseTime].Sun = course;
            break;
          case 1:
            newData[courseTime].Mon = course;
            break;
          case 2:
            newData[courseTime].Tue = course;
            break;
          case 3:
            newData[courseTime].Wed = course;
            break;
          case 4:
            newData[courseTime].Tur = course;
            break;
          case 5:
            newData[courseTime].Fri = course;
            break;
          case 6:
            newData[courseTime].Sat = course;
            break;
          default:
            break;
        }
      }
    }
    this.setState({
      week: newWeek,
      data: newData
    });
  };

  initWeek() {
    let answer = [2020, 1, 1];
    let now = new Date();
    let period;
    const SPRING_2020 = new Date("2020-02-23 00:00:00.000");
    const SUMMER_2020 = new Date("2020-06-28 00:00:00.000");
    const FALL_2020 = new Date("2020-09-06 00:00:00.000");

    if (SPRING_2020 <= now && now < SUMMER_2020) {
      period = now.getTime() - SPRING_2020.getTime();
      answer[1] = 1;
    } else if (now < FALL_2020) {
      period = now.getTime() - SUMMER_2020.getTime();
      answer[1] = 2;
    } else {
      period = now.getTime() - FALL_2020.getTime();
      answer[1] = 3;
    }

    answer[2] = Math.ceil(period / 1000 / 86400 / 7);
    return answer;
  }

  tableCell(course) {
    return (
      <>
        <div className="name">{ course.name }</div>
        <div className="teacher">{ course.teacher }</div>
        <div className="location">{ course.location }</div>
      </>
    )
  }

  render() {
    return (
      <>
        <div id="selector">
          <Cascader
            defaultValue={this.state.week}
            options={this.state.options}
            onChange={this.onChange}
            allowClear={false}
          />
        </div>
        <Table dataSource={this.state.data} pagination={false}>
          <Column title="节次" dataIndex="key" render={(item) => <>{item}</>} />
          <Column title="星期日" dataIndex="Sun" render={this.tableCell} />
          <Column title="星期一" dataIndex="Mon" render={this.tableCell} />
          <Column title="星期二" dataIndex="Tue" render={this.tableCell} />
          <Column title="星期三" dataIndex="Wed" render={this.tableCell} />
          <Column title="星期四" dataIndex="Tur" render={this.tableCell} />
          <Column title="星期五" dataIndex="Fri" render={this.tableCell} />
          <Column title="星期六" dataIndex="Sat" render={this.tableCell} />
        </Table>
      </>
    );
  }
}

export default Coursetable;
