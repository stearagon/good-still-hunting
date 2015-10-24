class Api::TagsController < ApplicationController
  def show
    @tag = Tag.find_by_tag(params[:query])
    render json: @tag
  end
end
