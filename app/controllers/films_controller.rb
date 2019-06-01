class FilmsController < ApplicationController
  def index
    @films = SwapiService.films
  end

  def show
    @film = SwapiService.film(params[:id])
  end

end
