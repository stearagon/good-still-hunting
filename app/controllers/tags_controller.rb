class TagsController < ApplicationController
  def show
    @tag = Tag.find_by_tag(params[:query])
    @stills = @tag.stills.page(params[:page]).per(9)
  end
end
