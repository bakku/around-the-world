class Round < ApplicationRecord
  belongs_to :game
  has_many :number_attempts, dependent: :destroy

  validates :required_multiplier, inclusion: { in: %w[singles doubles triples] }
end
