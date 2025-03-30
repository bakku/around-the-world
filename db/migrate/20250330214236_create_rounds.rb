class CreateRounds < ActiveRecord::Migration[8.0]
  def change
    create_table :rounds do |t|
      t.references :game, null: false, foreign_key: true

      t.boolean :include_bulls_eye, null: false, default: false
      t.string :required_multiplier, null: false, default: "singles"
      t.integer :total_throws, null: false, default: 0

      t.timestamps
    end
  end
end
