class RootController < ApplicationController

  def root
    @stills = Still.shuffle.page params[:page]
  end

end
