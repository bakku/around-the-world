class CreateNumberAttempts < ActiveRecord::Migration[8.0]
  def change
    create_table :number_attempts do |t|
      t.references :round, null: false, foreign_key: true

      t.integer :target_number, null: false
      t.integer :throws_needed, null: false, default: 1

      t.timestamps
    end

    add_index :number_attempts, [:round_id, :target_number], unique: true
  end
end
