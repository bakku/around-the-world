class NumberAttempt < ApplicationRecord
  belongs_to :round

  validates :target_number, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :throws_needed, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :target_number, uniqueness: { scope: :round_id }
end
