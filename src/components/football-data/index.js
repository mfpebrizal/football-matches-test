
import React, { Component } from "react";
import "./index.css";
const classNames = require('classnames');

export default class FootballMatchesData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      matches: null
    };
    this.onChangeYear = this.onChangeYear.bind(this);
  }

  componentDidUpdate(_, prevState)  {
    if(this.state.selectedYear !== prevState.selectedYear) {
      const selectedYear = this.state.selectedYear;
      this.onChangeYear(selectedYear);
    }
  }

  onClick = (year) => (e) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    this.setState({
      selectedYear: year
    })
  }

  onChangeYear(year) {
    const url = `https://jsonmock.hackerrank.com/api/football_competitions?year=${year}`
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({ matches: data.data }));
  }

  render() {
    var years= [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li className={
                classNames({
                  'sidebar-item': true,
                  'active': this.state.selectedYear === year
                })
              }
              onClick={this.onClick(year)}
              key={year}>
                <a>{year}</a>
              </li>
            )
          })}
        </ul>

        <section className="content">
          {
            !this.state.matches ? null : (
              this.state.matches.length > 0 ?
                <section>
                  <div className="total-matches" data-testid="total-matches">Total matches: {this.state.matches.length}</div>
                  
                  <ul className="mr-20 matches styled" data-testid="match-list">
                    {this.state.matches.map((match, index) => (<li key={index+1} className="slide-up-fade-in">Match {match.name} won by {match.winner}</li>))}
                  </ul>
                </section> : <div data-testid="no-result" className="slide-up-fade-in no-result">No Matches Found</div>
              )
          }
        </section>
      </div>
    );
  }
}