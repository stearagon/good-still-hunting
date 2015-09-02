class CreateStills < ActiveRecord::Migration
  def change
    create_table :stills do |t|
      t.string :name, null: false

      t.timestamps
    end

    add_attachment :stills, :image
  end
end
