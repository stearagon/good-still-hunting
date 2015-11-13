class Api::MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :year, :director, :genre, :stills

  def stills
    object.stills
  end
end
