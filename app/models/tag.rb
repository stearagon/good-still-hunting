# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  tag        :string           not null
#  created_at :datetime
#  updated_at :datetime
#

class Tag < ActiveRecord::Base
  validates :tag, presence: true, uniqueness: true

  belongs_to :still
end
