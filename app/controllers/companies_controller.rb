class CompaniesController < ApplicationController

  def index
    if current_user
      @companies = current_user.companies.order(created_at: :desc)
      json_response = Company.build_json(@companies)
      render json: json_response
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
      @new_company = [current_user.companies.create!(company_params)]
      json_response = Company.build_json(@new_company)
      render json: json_response
    else
      redirect_to(new_session_url)
    end
  end

  def destroy
    company = Company.find(params[:id])
    company.destroy!
    render json: company
  end

  private
    def company_params
      params.require(:company).permit(:name, :ticker)
    end

end
