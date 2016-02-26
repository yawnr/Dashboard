var Company = React.createClass({

  imageLoaded: function (e) {
    $(e.currentTarget).addClass('loaded')
  },

  render: function () {
    var co = this.props.company

    return (
      <div key={co.id} className="company-container">
      <div className="company-ticker" >{co.ticker}</div>
        <div className="company-name" >{co.name}</div>
        <div className="stock-detail-container">
          <table>
            <tbody>
              <tr>
                <td>{"Change"}</td>
                <td>{"% Change"}</td>
                <td>{"Day's Low"}</td>
                <td>{"Day's High"}</td>
                <td>{"Market Cap"}</td>
                <td>{"EBITDA"}</td>
              </tr>
              <tr>
                <td className={"move " + "move" + co.quote.Change.substring(0,1)}>{co.quote.Change}</td>
                <td className={"move " + "move" + co.quote.Change.substring(0,1)}>{co.quote.PercentChange}</td>
                <td>{co.quote.DaysHigh}</td>
                <td>{co.quote.DaysLow}</td>
                <td>{co.quote.MarketCapitalization}</td>
                <td>{co.quote.EBITDA}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="charts-container group">
          <img src={co.oneDayChart} className="image" onLoad={this.imageLoaded} />
          <img src={co.fiveDayChart} className="image" onLoad={this.imageLoaded} />
          <img src={co.oneMonthChart} className="image" onLoad={this.imageLoaded} />
        </div>

        <div className="filings-container">
          <table>
            <thead>
              <tr>
                <td>{"Date"}</td>
                <td>{"Title"}</td>
                <td>{"Direct Link"}</td>
              </tr>
            </thead>
            <tbody>
            {co.filings.map(function (filing) {
              return(
                <tr>
                <td>{filing.date}</td>
                <td>{filing.title}</td>
                <td><a href={filing.link}>{"Link"}</a></td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>

      </div>
    );
  }

});
