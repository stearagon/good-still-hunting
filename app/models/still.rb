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
  attr_accessor :image
  validates :name, presence: true, uniqueness: true

  validates :image, presence: true
  validates :movie_id, presence: true
  has_attached_file :image, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>'
  }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :movie
  has_many :stills_tags
  has_many :tags, through: :stills_tags

  def update_tags(tags)
    tags = tags.split

    self.tags.each_with_index do |tag, idx|
      if !tags.include?("#" + tag.tag)
        self.tags.delete(tag)
      else
        tags.delete("#" + tag.tag)
      end
    end

    tags.each do |tag|
      tag.slice!(0)
      new_tag = Tag.new(tag: tag)

      if new_tag.save
        self.tags << new_tag
      else
        self.tags << Tag.find_by_tag(tag)
      end

    end

  end

  def list_tags
    answer = []

    self.tags.each do |tag|
      answer << "#" + tag.tag
    end

    answer
  end
end
