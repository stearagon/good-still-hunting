# == Schema Information
#
# Table name: movies
#
#  id                      :integer          not null, primary key
#  title                   :string           not null
#  director                :string           not null
#  year                    :integer          not null
#  genre                   :string           not null
#  created_at              :datetime
#  updated_at              :datetime
#  director_of_photography :string
#  decade                  :string
#  aspect_ratio            :string
#

class Movie < ActiveRecord::Base
  GENRES = %w(Action Comedy Drama Mystery Thriller Documentary Horror)

  validates :title, :director, :year, :genre, presence: true

  validates :title, uniqueness: { scope: [:director, :year] }

  has_many :stills, dependent: :destroy

  def strip_whitespace
    self.title = self.title.strip
    self.director = self.director.strip
    self.genre = self.genre.strip
    self.director_of_photography = self.director_of_photography.strip
  end
end
