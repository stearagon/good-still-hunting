class Api::MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :year, :director, :genre
end
