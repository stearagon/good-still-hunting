Rails.application.routes.draw do
  resources :stills
  resources :movies
  root 'root#root'
  get 'search', to: 'search#search'
end
