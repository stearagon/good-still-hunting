Rails.application.routes.draw do

  namespace :api do
    resource :sessions, only: [:create, :destroy]
    resources :users, only: [:create]
    resources :stills
    resources :movies
    resources :stills_tags
    resources :tags, only: [:show, :create, :index]
  end

  mount_ember_app :frontend, to: "/"
end
