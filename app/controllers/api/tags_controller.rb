class Api::TagsController < ApplicationController
  def show
    @tag = Tag.find(params[:id])
    render json: @tag
  end

  def create
    @tag = Tag.find_by(tag_params)

    @tag ||= Tag.new(tag_params)

    if @tag.save
      render json: @tag
    else
      render json: @tag.errors.full_messages
    end
  end

  def index
    @tags = Still.find(params[:still_id]).tags
    render json: @tags
  end

  private

  def tag_params
    params.require(:tag).permit(:tag)
  end
end
