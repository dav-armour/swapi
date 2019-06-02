class FilmsController < ApplicationController
  def index
    @films = SwapiService.films
  end

  def show
    @film = SwapiService.film(params[:id])
    all_characters = SwapiService.characters
    @characters = all_characters.select do |char|
        @film['characters'].include? char['url']
    end
  end

end
