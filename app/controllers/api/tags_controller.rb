class Api::TagsController < ApplicationController
  before_action :authenticate!, only: [:create]

  def index
    if params[:still_id]
      @tags = Still.find(params[:still_id]).tags
    else
       @tags = Tag.tag_search(params[:query]).limit(100).sort_by { |tag| tag.tag_length }
     end

    render json: @tags
  end

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

  private

  def tag_params
    params.require(:tag).permit(:tag)
  end
end
