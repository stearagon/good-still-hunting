class Api::MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :year, :director, :genre, :director_of_photography, :decade, :aspect_ratio
end
