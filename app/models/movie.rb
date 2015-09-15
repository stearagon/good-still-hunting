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
  include PgSearch
  pg_search_scope :search_by_title, against: :title
  GENRES = %w(Action Comedy Drama Mystery Thriller Documentary Horror)

  validates :title, :director, :year, :genre, presence: true

  validates :title, uniqueness: { scope: [:director, :year] }

  has_many :stills

  def title_year_director
    "#{title} (#{year}) directed by #{director}"
  end
end
