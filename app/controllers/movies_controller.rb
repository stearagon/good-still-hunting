class MoviesController < ApplicationController
  GENRES = %w("Action", "Comedy", "Drama", "Mystery", "Thriller", "Documentary", "Horror")

  def new
    @movie = Movie.new
  end

  def create
    @movie = Movie.new(movie_params)
  end

  private
  def movie_params
    params.require(:movie).permit(:title, :year, :director, :genre)
  end
end
