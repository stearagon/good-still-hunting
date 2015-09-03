Rails.application.routes.draw do
  resources :stills
  resources :movies
  root 'root#root'
end
