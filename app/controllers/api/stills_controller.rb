class Api::StillsController < ApplicationController
  before_action :authenticate!

  def index
    if (params[:search_input].nil? || params[:search_input] == '') && params[:tag_id].nil? && params[:movie_id].nil?
      @stills = Still.all
    elsif (params[:search_input].nil? || params[:search_input] == '') && params[:movie_id].nil?
      @stills = Tag.find(params[:tag_id]).stills
      @stills = Kaminari.paginate_array(@stills)
    elsif (params[:search_input].nil? || params[:search_input] == '')
      @stills = Movie.find(params[:movie_id]).stills
    else
      @stills = PgSearch
        .multisearch(params[:search_input])
        .includes(:searchable).map(&:searchable)
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
