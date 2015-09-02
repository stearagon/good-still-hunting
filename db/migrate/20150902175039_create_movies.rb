class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.string :director, null: false
      t.integer :year, null: false
      t.string :genre, null: false

      t.timestamps
    end

    add_index :movies, :title
    add_index :movies, :director
    add_index :movies, :genre
    add_index :movies, :year
  end
end
