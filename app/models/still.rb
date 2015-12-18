# == Schema Information
#
# Table name: stills
#
#  id                 :integer          not null, primary key
#  name               :string           not null
#  created_at         :datetime
#  updated_at         :datetime
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  movie_id           :integer          not null
#

class Still < ActiveRecord::Base
  include PgSearch

  multisearchable :against => :tags_tags

  attr_accessor :image
  validates :name, presence: true, uniqueness: true

  validates :image, presence: true
  validates :movie_id, presence: true
  has_attached_file :image, styles: {
    medium: '300x300>'
  }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :movie
  has_many :stills_tags, dependent: :destroy
  has_many :tags, through: :stills_tags

  def tags_tags
    result = []
    tags.each do |tag|
      result << tag.tag
    end
    return result
  end
end
