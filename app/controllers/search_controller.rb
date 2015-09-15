class SearchController < ApplicationController
  def search
    @search_results = Kaminari.paginate_array(
      PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
    ).page(params[:page]).per(9)
      render :search
  end

  def movie_search
    @search_results = Movie.search_by_title(params[:query])
    render :movie_search
  end


end
