class GamesController < ApplicationController
  def show
    render inertia: "Game", props: {
      gameId: params[:id]
    }
  end
end
