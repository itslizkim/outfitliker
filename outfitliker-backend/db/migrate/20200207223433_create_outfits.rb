class CreateOutfits < ActiveRecord::Migration[6.0]
  def change
    create_table :outfits do |t|
      t.string :name
      t.string :season
      t.string :img_url
      t.integer :like_count
      t.integer :user_id

      t.timestamps
    end
  end
end
