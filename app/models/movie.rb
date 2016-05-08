# == Schema Information
#
# Table name: movies
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  director   :string           not null
#  year       :integer          not null
#  genre      :string           not null
#  created_at :datetime
#  updated_at :datetime
#

class Movie < ActiveRecord::Base
  GENRES = %w(Action Comedy Drama Mystery Thriller Documentary Horror)

  validates :title, :director, :year, :genre, presence: true

  validates :title, uniqueness: { scope: [:director, :year] }

  has_many :stills, dependent: :destroy
end
