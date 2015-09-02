

class StillsController < ApplicationController
  def new
    @still = Still.new
  end

  def create
    @still = Still.new(still_params)
    if @still.save!
      render :show
    else
      flash.now[:errors] = @still.errors.full_messages
      render :new
    end
  end

  def show
    @still = Still.find(params[:id])
  end

  private
  def still_params
    params.require(:still).permit(:name, :image)
  end
end
