class RootController < ApplicationController

  def root
    @stills = Still.all
  end

end
