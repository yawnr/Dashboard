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
      sec_company = SecQuery::Entity.find(company.ticker.downcase)
      filings_data = []
      if sec_company
        if sec_company.filings.length >= 5
          filings = sec_company.filings[0..4]
        else
          filings = sec_company.filings
        end

        filings.each do |filing|
          filings_data.push({date: filing.date, title: filing.title, link: filing.link})
        end
      end

      company_hash['filings'] = filings_data

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

  end


end
