var AllCompanies = React.createClass({

  getInitialState: function () {
    return { companies: [] };
  },

  componentDidMount: function () {
    if (this.state.companies.length < 1) {
      this.fetchCompanies();
    }
  },

  fetchCompanies: function () {
    var that = this;
    $.ajax({
      url: 'companies',
      method: "GET",
      dataType: "json",
      success: function (user_companies) {
        that.setState({ companies: user_companies })
      }
    });
  },

  addCompany: function (event) {
    event.preventDefault();

    var that = this;
    var company = {
      name: React.findDOMNode(this.refs.companyName).value,
      ticker: React.findDOMNode(this.refs.companyTicker).value,
    }

    var newCompanies = this.state.companies.slice()

    $.ajax({
      url: 'companies',
      method: "POST",
      dataType: "json",
      data: {company: company},
      success: function (company) {
        newCompanies.unshift(company[0])
        that.setState({ companies: newCompanies })
      }
    });
  },

  render: function () {

    var toRender;
    var companyForm = (
      <form className="new_company_form" onSubmit={this.addCompany}>
        <input type="text" ref="companyName" name="company[name]" placeholder="Company Name" />
        <input type="text" ref="companyTicker" name="company[ticker]" placeholder="Ticker Symbol" />
        <button>Add Company</button>
      </form>
    );

    if (this.state.companies.length > 0) {
      toRender = (<div>
                    {this.state.companies.map(function (company) {
                        return (<Company company={company} />);
                      })
                    }
                  </div>
                  );
    } else {
      toRender = (<div>spinner.gif</div>);
    }

    return (<div>
              {companyForm}
              {toRender}
            </div>
          );
  }

});
