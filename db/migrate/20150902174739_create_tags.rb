class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :tag, null: false

      t.timestamps
    end

    add_index :tags, :tag, unique: true
  end
end
