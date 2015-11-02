Rails.application.routes.draw do
  root 'root#root'
  namespace :api do
    resources :stills
    resources :movies
    resources :stills_tags
    resources :tags, only: [:show, :create, :index]
  end
  get '/*path' => 'root#root'
end
