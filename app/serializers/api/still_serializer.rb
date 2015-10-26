class Api::StillSerializer < ActiveModel::Serializer
  attributes :id, :name, :medium_image_url, :large_image_url, :movie_id

  def medium_image_url
    object.image(:medium)
  end

  def large_image_url
    object.image.url
  end

end
