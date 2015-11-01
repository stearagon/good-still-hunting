class AddIdToStillsTags < ActiveRecord::Migration
  def change
    add_column :stills_tags, :id, :primary_key
  end
end
