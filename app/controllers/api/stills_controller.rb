class Api::StillsController < ApplicationController
  def index
    if(params[:film_id])
      @stills = Movie.find(params[:film_id]).stills
    elsif(params[:search_input].nil?)
      @stills = Still.all
    else
      @tags = Tag.tag_search(params[:search_input])
      @stills = []

      @tags.to_a.each {|tag| @stills.concat(tag.stills) }
      @stills = Kaminari.paginate_array(@stills)
    end

    @stills = @stills.page(params[:page]).per(params[:per_page])

    render json: @stills, each_serializer: Api::StillSerializer
  end

  def create
    @still = Still.new(still_params)

    if @still.save
      # @still.update_tags(params[:tags])
      render json: @still
    else
      render json: @still.errors.full_messages
    end
  end

  def update
    @still = Still.find(params[:id])

    if @still.update(still_params)
      # @still.update_tags(params[:tags])
      render json: @still
    else
      render json: @still.errors.full_messages
    end
  end

  def show
    @still = Still.find(params[:id])
    render json: @still
  end

  def destroy
    @still = Still.find(params[:id])

    @still.destroy

    render json: { message: 'still destroyed'}
  end


  private
  def still_params
    params.require(:still).permit(:name, :image, :movie_id)
  end
end
