

class StillsController < ApplicationController
  def new
    @still = Still.new
  end

  def edit
    @still = Still.find(params[:id])
  end

  def create
    @still = Still.new(still_params)



    if @still.save
      @still.update_tags(params[:tags])
      redirect_to root_url
    else
      flash.now[:errors] = @still.errors.full_messages
      render :new
    end
  end

  def update
    @still = Still.find(params[:id])



    if @still.update(still_params)
      @still.update_tags(params[:tags])
      redirect_to root_url
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
    params.require(:still).permit(:name, :image, :movie_id)
  end
end
