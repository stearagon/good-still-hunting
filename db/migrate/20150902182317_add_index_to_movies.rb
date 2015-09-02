class AddIndexToMovies < ActiveRecord::Migration
  def change
    add_index :movies, [:title, :director, :year], unique: true
  end
end
