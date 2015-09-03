class AddJoinToStill < ActiveRecord::Migration
  def change
    add_column :stills, :movie_id, :integer, null: false
  end
end
