class Game < ApplicationRecord
  has_many :rounds, dependent: :destroy
end
