class AddExtraFilmColumns < ActiveRecord::Migration
  def change
    add_column :movies, :director_of_photography, :string, default: nil
    add_column :movies, :decade, :string, default: nil
    add_column :movies, :aspect_ratio, :string, default: nil
  end
end
