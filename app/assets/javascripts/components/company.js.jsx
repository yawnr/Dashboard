var Company = React.createClass({

  render: function () {
    return (
      <div key={this.props.company.id} className="company-container">
        <div className="company-name" >{this.props.company.name}</div>
        <div className="company-ticker" >{this.props.company.ticker}</div>
        <div className="stock-detail-container">
          Stock details go here
        </div>

        <div className="charts-container">
          <img src={this.props.company.oneDayChart} />
          <img src={this.props.company.fiveDayChart} />
          <img src={this.props.company.oneMonthChart} />
        </div>

        <div className="filings-container">
          Filings go here
        </div>

      </div>
    );
  }

});
