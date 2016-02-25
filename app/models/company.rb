class Company < ActiveRecord::Base

  validates :ticker, :user_id, presence: true

  belongs_to :user

  def self.build_json(companies)
    json_response = []

    companies.each do |company|
      company_hash = {id: company.id, user_id: company.user_id, name: company.name.capitalize, ticker: company.ticker.upcase}
      company_hash['oneDayChart'] = "http://ichart.finance.yahoo.com/b?s=#{company.ticker.upcase}"
      company_hash['fiveDayChart'] = "http://ichart.finance.yahoo.com/w?s=#{company.ticker.upcase}"
      company_hash['oneMonthChart'] = "http://ichart.finance.yahoo.com/c/1m/#{company.ticker.upcase}"
      json_response.push(company_hash)
    end

    json_response

    # tickers = []
    #
    # @companies.each do |company|
    #   tickers.push(company.ticker.upcase)
    # end
    #
    # ticker_string = tickers.join(",")
    # data_url = "http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22#{ticker_string}%22%29&env=store://datatables.org/alltableswithkeys"
    # @financial_data = Nokogiri::HTML(open(data_url))
    # @json_response = Company.build_json(@companies)

  end


end
