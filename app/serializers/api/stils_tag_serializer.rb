class Api::StillsTagSerializer < ActiveModel::Serializer
  attributes :id, :still_id, :tag_id
end
