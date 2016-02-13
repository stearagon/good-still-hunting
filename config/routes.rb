Rails.application.routes.draw do

  namespace :api do
    resource :session, only: [:new, :create, :destroy]
    resources :users, only: [:new, :create]
    resources :stills
    resources :movies
    resources :stills_tags
    resources :tags, only: [:show, :create, :index]
  end

  mount_ember_app :frontend, to: "/"
end
