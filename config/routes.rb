Rails.application.routes.draw do

  root 'users#show'

  resources :companies
  resources :users, only: [:new, :create, :show, :update]
  resource :session, only: [:new, :create, :destroy]

end
