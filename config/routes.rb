Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :employees, only: [:create, :update, :destroy, :index]
    end
  end

  get 'list_employees', to: 'employees#index'
end
