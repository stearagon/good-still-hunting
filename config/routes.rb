Rails.application.routes.draw do
  namespace :api do
    resources :stills
    resources :movies
    resources :stills_tags
    resources :tags, only: [:show, :create, :index]
  end

  mount_ember_app :frontend, to: "/"
end
