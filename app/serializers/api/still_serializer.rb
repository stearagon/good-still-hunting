class Api::StillSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url

  has_one :movie

  def image_url
    object.image(:medium)
  end

end
