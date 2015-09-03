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
#

class Still < ActiveRecord::Base
  attr_accessor :image
  validates :name, presence: true, uniqueness: true
  validates :movie_id, presence: true
  has_attached_file :image, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>'
  }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :movie
  has_many :tags
end
