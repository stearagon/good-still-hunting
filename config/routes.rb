Rails.application.routes.draw do
  root 'root#root'
  namespace :api do
    resources :stills
    resources :movies
    get 'search', to: 'search#search'
    get 'movie_search', to: 'search#movie_search'
    resources :tags, only: [:show]
  end
  get '/*path' => 'root#root'
end
