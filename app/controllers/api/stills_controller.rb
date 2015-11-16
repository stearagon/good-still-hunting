class Api::StillsController < ApplicationController
  def index
    if (params[:search_input].nil? || params[:search_input] == '') && params[:tag_id].nil?
      @stills = Still.all
    elsif (params[:search_input].nil? || params[:search_input] == '')
      @stills = Tag.find(params[:tag_id]).stills
    else
      @tags = Tag.tag_search(params[:search_input])
      @stills = []

      @tags.to_a.each {|tag| @stills.concat(tag.stills) }
      @stills = Kaminari.paginate_array(@stills)
    end
    
    session[:seed] = params[:seed] if !params[:seed].nil?
    srand session[:seed].to_i

    @stills = Kaminari.paginate_array(@stills.shuffle).page(params[:page]).per(params[:per_page])

    render json: @stills, meta: { total_pages: @stills.total_pages, page: params[:page], per_page: params[:per_page], search_input: params[:search_input]}, each_serializer: Api::StillSerializer
  end

  def create
    @still = Still.new(still_params)

    if @still.save
      render json: @still
    else
      render json: @still.errors.full_messages
    end
  end

  def update
    @still = Still.find(params[:id])

    if @still.update(still_params)
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
