class CreateStillsTags < ActiveRecord::Migration
  def change
    create_table :stills_tags, id: false do |t|
      t.integer :still_id, null: false, index: true
      t.integer :tag_id, null: false, index: true

      t.timestamps
    end
  end
end
