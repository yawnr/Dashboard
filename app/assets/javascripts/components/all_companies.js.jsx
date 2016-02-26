var AllCompanies = React.createClass({

  getInitialState: function () {
    return { companies: [] };
  },

  componentDidMount: function () {
    if (this.state.companies.length < 1) {
      this.fetchCompanies();
    }
  },

  backgroundRefresh: function () {
    var that = this;
    setTimeout(function() {
        that.fetchCompanies();
    }, 900000);
  },

  fetchCompanies: function () {
    this.backgroundRefresh();
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

    $('input:text').val('');
    $("input").blur();

    var newCompanies = this.state.companies.slice()

    var alreadyThere = false;
    for (var i = 0; i < newCompanies.length; i++) {
      if (newCompanies[i].ticker == company.ticker) {
        alreadyThere = true;
        break;
      }
    }

    if (!alreadyThere) {
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
    }
  },

  deleteCompany: function (company) {
    var that = this;
    var newCompanies = this.state.companies.slice()
    var spliceIdx;
    for (var i = 0; i < newCompanies.length; i++) {
      if (newCompanies[i].ticker == company.ticker) {
        spliceIdx = i;
        break;
      }
    }

    var divClass = ".".concat(company.name);

    $.ajax({
      url: 'companies/' + company.id,
      method: "DELETE",
      dataType: "json",
      success: function (company) {
        $(divClass).slideUp(1000)
        setTimeout(function() {
            newCompanies.splice(spliceIdx, 1);
            that.setState({ companies: newCompanies });
        }, 1000);
      }
    });
  },

  render: function () {
    var that = this;
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
                        return (<div key={company.name} className={"company " + company.name}>
                                  <Company key={company.id} company={company} />
                                  <button onClick={that.deleteCompany.bind(null, company)} >Delete</button>
                                </div>
                                );
                      })
                    }
                  </div>
                  );
    } else {
      toRender = (<div>Add Some Companies</div>);
    }

    setTimeout(function() {
      $('.company-page').addClass('loaded');
    }, 200);

    setTimeout(function() {
      $('.company').addClass('loaded');
    }, 200);

    return (<div className="company-page">
              {companyForm}
              {toRender}
            </div>
          );
  }

});
