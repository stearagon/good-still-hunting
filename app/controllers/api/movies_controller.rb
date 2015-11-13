class Api::MoviesController < ApplicationController
  def create
    @movie = Movie.new(movie_params)

    if @movie.save
      render json: @movie
    else
      render json: @movie.errors.full_messages
    end
  end

  def index
    @movies = Movie.includes(:stills).all
    render json: @movies
  end

  def show
    @movie = Movie.includes(:stills).find(params[:id])
    render json: @movie
  end

  private
  def movie_params
    params.require(:movie).permit(:title, :year, :director, :genre)
  end
end
