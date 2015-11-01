Rails.application.routes.draw do
  root 'root#root'
  namespace :api do
    resources :stills
    resources :movies
    resources :stills_tags
    get 'search', to: 'search#search'
    get 'movie_search', to: 'search#movie_search'
    resources :tags, only: [:show, :create, :index]
  end
  get '/*path' => 'root#root'
end
