class CreateGames < ActiveRecord::Migration[8.0]
  def change
    create_table :games do |t|
      t.string :key, null: false

      t.timestamps
    end

    add_index :games, :key, unique: true
  end
end
