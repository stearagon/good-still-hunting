class RootController < ApplicationController

  def root
    @stills = Still.order(:name).page params[:page]
  end

end
