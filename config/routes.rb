Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'films#index'
  get 'films', to: 'films#index'
  get 'films/:id', to: 'films#show'
end
