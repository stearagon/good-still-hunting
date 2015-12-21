Rails.application.routes.draw do
  mount_ember_app :frontend, to: "/"
  namespace :api do
    resources :stills
    resources :movies
    resources :stills_tags
    resources :tags, only: [:show, :create, :index]
  end
end
