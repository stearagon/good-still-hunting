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
  include PgSearch
  validates :tag, presence: true, uniqueness: true

  pg_search_scope :tag_search,
                  :against => :tag,
                  :using => {
                    :tsearch => {:prefix => true}
                  }

  has_many :stills_tags, dependent: :destroy
  has_many :stills, through: :stills_tags
end
