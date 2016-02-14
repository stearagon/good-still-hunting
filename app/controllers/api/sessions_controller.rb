class Api::SessionsController < ApplicationController
  def create
    user = User.find_by_user_credentials(params[:email],
                                          params[:password])

    if user
      login!(user)
      render json: user
    else
      head :unprocessable_entity
    end

  end

  def show
    if current_user
      render json: user
    else
      render json: {}
    end
  end

  def destroy
    logout!
    render json: {}
  end
end
