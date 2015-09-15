Rails.application.routes.draw do
  resources :stills
  resources :movies
  root 'root#root'
  get 'search', to: 'search#search'
  get 'movie_search', to: 'search#movie_search'
  resources :tags, only: [:show]
end
