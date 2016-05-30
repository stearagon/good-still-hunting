class Api::MoviesController < ApplicationController
  before_action :authenticate!, only: [:create]

  def create
    @movie = Movie.new(movie_params)

    %w{director_of_photography decade director aspect_ratio title year genre}.each do |new_tag|
      Tag.find_or_create_by(tag: movie_params[new_tag])
    end

    if @movie.save
      render json: @movie
    else
      render json: @movie.errors.full_messages
    end
  end

  def index
    if params[:movie_title]
      @movies = Movie.find_by_title(params[:movie_title])
    else
      @movies = Movie.all.order(:title)
    end

    render json: @movies
  end

  def show
    @movie = Movie.find(params[:id])

    render json: @movie
  end

  private
  def movie_params
    params.require(:movie).permit(:title, :year, :director, :genre, :director_of_photography, :aspect_ratio, :decade)
  end
end
