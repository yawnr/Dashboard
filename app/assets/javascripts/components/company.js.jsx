var Company = React.createClass({

  imageLoaded: function (e) {
    $(e.currentTarget).addClass('loaded')
  },

  render: function () {
    var co = this.props.company

    return (
      <div key={co.id} className="company-container">
        <div className="company-name" >{co.name}</div>
        <div className="company-ticker" >{co.ticker}</div>
        <div className="stock-detail-container">
          <table>
            <tbody>
              <tr>
                <td>{"Day's Low"}</td>
                <td>{"Day's High"}</td>
                <td>{"Market Cap"}</td>
                <td>{"EBITDA"}</td>
              </tr>
              <tr>
                <td>{co.quote.DaysHigh}</td>
                <td>{co.quote.DaysLow}</td>
                <td>{co.quote.MarketCapitalization}</td>
                <td>{co.quote.EBITDA}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="charts-container">
          <img src={co.oneDayChart} className="image" onLoad={this.imageLoaded} />
          <img src={co.fiveDayChart} className="image" onLoad={this.imageLoaded} />
          <img src={co.oneMonthChart} className="image" onLoad={this.imageLoaded} />
        </div>

        <div className="filings-container">
          Filings go here
        </div>

      </div>
    );
  }

});
