class MoviesController < ApplicationController

  def new
    @movie = Movie.new
  end

  def create
    @movie = Movie.new(movie_params)

    if @movie.save
      redirect_to movies_url
    else
      flash.now[:errors] = @movie.errors.full_messages
      render :new
    end
  end

  def index
    @movies = Movie.all
  end

  def show
    @movie = Movie.find(params[:id])
    @stills = Kaminari.paginate_array(Still.all.shuffle).page params[:page]
  end

  private
  def movie_params
    params.require(:movie).permit(:title, :year, :director, :genre)
  end
end
