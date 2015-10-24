class Api::SearchController < ApplicationController
  def search
    @search_results = Kaminari.paginate_array(
      PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
    ).page(params[:page]).per(9)
      render json: @search_results
  end

  def movie_search
    @search_results = Movie.search_by_title(params[:query])
    render json: @search_results
  end


end
