class GamesController < ApplicationController
  def create
    game = Game.new
    game.key = SecureRandom.uuid
    game.save!

    redirect_to game_path(game.key)
  end

  def show
    game = Game.find_by!(key: params[:key])
    rounds = game.rounds.includes(:number_attempts).order(created_at: :desc)
    
    # Calculate best score, grouped by settings
    best_scores = {}
    game.rounds.each do |round|
      settings_key = "#{round.include_bulls_eye}-#{round.required_multiplier}"
      if best_scores[settings_key].nil? || round.total_throws < best_scores[settings_key]
        best_scores[settings_key] = round.total_throws
      end
    end
    
    render inertia: "Game", props: {
      gameId: game.key,
      bestScore: best_scores,
      rounds: rounds.map do |round|
        {
          id: round.id,
          includeBullsEye: round.include_bulls_eye,
          requiredMultiplier: round.required_multiplier,
          totalThrows: round.total_throws,
          createdAt: round.created_at,
          numberAttempts: round.number_attempts.map do |attempt|
            {
              targetNumber: attempt.target_number,
              throwsNeeded: attempt.throws_needed
            }
          end
        }
      end
    }
  end
end
