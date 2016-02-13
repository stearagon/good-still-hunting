# == Schema Information
#
# Table name: stills_tags
#
#  still_id   :integer          not null
#  tag_id     :integer          not null
#  created_at :datetime
#  updated_at :datetime
#  id         :integer          not null, primary key
#

class StillsTag < ActiveRecord::Base
  validates :still_id, :tag_id, presence: true

  belongs_to :still, inverse_of: :stills_tags
  belongs_to :tag, inverse_of: :stills_tags
end
