class Api::MoviesController < ApplicationController
  before_action :authenticate!
  
  def create
    @movie = Movie.new(movie_params)

    if @movie.save
      render json: @movie
    else
      render json: @movie.errors.full_messages
    end
  end

  def index
    @movies = Movie.all.order(:title)
    render json: @movies
  end

  def show
    @movie = Movie.find(params[:id])
    render json: @movie
  end

  private
  def movie_params
    params.require(:movie).permit(:title, :year, :director, :genre)
  end
end
