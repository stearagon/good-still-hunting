class SearchController < ApplicationController
  def search
    @search_results = Kaminari.paginate_array(
      PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
      .shuffle
    ).page params[:page]
      render :search
  end
end
