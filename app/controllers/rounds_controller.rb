class RoundsController < ApplicationController
  def create
    game = Game.find_by!(key: params[:game_key])
    
    ActiveRecord::Base.transaction do
      round = game.rounds.build(
        include_bulls_eye: params[:includeBullsEye],
        required_multiplier: params[:requiredMultiplier],
        total_throws: params[:totalThrows]
      )
      
      # Build number attempts before saving
      if params[:numberAttempts].present?
        params[:numberAttempts].each do |attempt|
          round.number_attempts.build(
            target_number: attempt[:targetNumber],
            throws_needed: attempt[:throwsNeeded]
          )
        end
      end
      
      if round.save
        render json: { success: true, roundId: round.id }
      else
        render json: { success: false, errors: round.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
end