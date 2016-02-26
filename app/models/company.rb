class Company < ActiveRecord::Base

  validates :ticker, :user_id, presence: true

  belongs_to :user

  require 'stock_quote'
  require 'open-uri'
  require 'nokogiri'

  def self.build_json(companies)
    json_response = []
    tickers = []

    companies.each do |company|
      tickers.push(company.ticker.downcase)
      company_hash = {id: company.id, user_id: company.user_id, name: company.name.capitalize, ticker: company.ticker.upcase}
      company_hash['oneDayChart'] = "http://ichart.finance.yahoo.com/b?s=#{company.ticker.upcase}"
      company_hash['fiveDayChart'] = "http://ichart.finance.yahoo.com/w?s=#{company.ticker.upcase}"
      company_hash['oneMonthChart'] = "http://ichart.finance.yahoo.com/c/1m/#{company.ticker.upcase}"

      # company_hash['sec_filings'] = SecQuery::Entity.find(company.ticker.upcase, :relationships=> true, :transactions=> {:start=> 0, :count=>20, :limit=> 20}, :filings=>{:start=> 0, :count=> 20, :limit=> 20})
      sec_url = "http://www.sec.gov/cgi-bin/browse-edgar?CIK=#{company.ticker.downcase}&owner=exclude&action=getcompany"
      # sec_data = Nokogiri::HTML(open(sec_url))
      # data_url = "http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22#{company.ticker.upcase}%22%29&env=store://datatables.org/alltableswithkeys"
      # financial_data = Nokogiri::HTML(open(data_url))
      # company_hash['daysHigh'] = financial_data.css('dayshigh')[0].text
      # company_hash['daysLow'] = financial_data.css('dayslow')[0].text
      # company_hash['marketCap'] = financial_data.css('marketcapitalization')[0].text
      # company_hash['EBITDA'] = financial_data.css('ebitda')[0].text

      json_response.push(company_hash)
    end

    if companies.length > 0
      financial_data = StockQuote::Stock.json_quote(tickers.join(', '))['quote']
      financial_data = [financial_data] if !financial_data.is_a?(Array)
      json_response.each_with_index do |company_hash, idx|
        company_hash['quote'] = financial_data[idx] if company_hash[:ticker].upcase == financial_data[idx]['symbol'].upcase
      end
      
    end

    json_response

    # tickers = []
    #
    # @companies.each do |company|
    # end
    #
    # ticker_string = tickers.join(",")
    # @json_response = Company.build_json(@companies)

  end


end
