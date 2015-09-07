class SearchController < ApplicationController
  def search
    @search_results = PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
      .shuffle
      render :search
  end
end
