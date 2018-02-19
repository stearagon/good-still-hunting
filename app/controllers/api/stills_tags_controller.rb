class Api::StillsTagsController < ApplicationController
  before_action :authenticate!, only: [:create, :update, :destroy]

  def index
    if params[:still_id]
      @stills_tags = StillsTag.where(still_id: params[:still_id])
    else
      @stills_tags = StillsTag.all
    end

    render json: @stills_tags
  end

  def create
    @stills_tag = StillsTag.new(stills_tag_params)

    if @stills_tag.save
      still = Still.find(stills_tag_params[:still_id])
      still.update_pg_search_document

      render json: { stills_tag: @stills_tag }
    else
      render json: @stills_tag.errors.full_messages
    end
  end

  def update
    @stills_tag = StillsTag.find(params[:id])

    if @stills_tag.update(still_tag_params)
      # @still.update_tags(params[:tags])
      render json: @stills_tag
    else
      render json: @stills_tag.errors.full_messages
    end
  end

  def show
    @stills_tag = StillsTag.find(params[:id])
    render json: @stills_tag
  end

  def destroy
    @stills_tag = StillsTag.find(params[:id])

    @stills_tag.destroy

    render json: { message: 'still destroyed'}
  end


  private
  def stills_tag_params
    params.require(:stills_tag).permit(:still_id, :tag_id)
  end
end
