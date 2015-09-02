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
  validates :name, presence: true, uniqueness: true
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  has_attached_file :image
end
