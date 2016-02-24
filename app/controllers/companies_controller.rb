class CompaniesController < ApplicationController

  def index
    if current_user
      @companies = current_user.companies
      render 'index'
    else
      redirect_to(new_session_url)
    end
  end

  def show
    company = company.find(params[:id])
    render 'show'
  end

  def create
    if current_user
      company = current_user.companies.create!(company_params)
      @companies = current_user.companies
      render 'index'
    else
      redirect_to(new_session_url)
    end
  end

  def update
    company = Company.find(params[:id])
    company.update!(company_params)
    render 'show'
  end

  private
    def company_params
      params.require(:company).permit(:name, :ticker)
    end

end
