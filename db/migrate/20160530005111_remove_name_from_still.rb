class RemoveNameFromStill < ActiveRecord::Migration
  def change
    remove_column :stills, :name
  end
end
