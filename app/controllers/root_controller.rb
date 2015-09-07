class RootController < ApplicationController

  def root
    @stills = Kaminari.paginate_array(Still.all.shuffle).page(params[:page]).per(9)
  end

end
