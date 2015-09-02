class AddIndexToStills < ActiveRecord::Migration
  def change
    add_index :stills, :name, unique: true
  end
end
