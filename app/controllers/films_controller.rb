class FilmsController < ApplicationController
  def index
    @films = SwapiService.films
  end

  def show
    @film = SwapiService.films(params[:id])
    # all_characters = SwapiService.characters
    # @characters = all_characters.select do |char|
    #     @film['characters'].include?(char['url'])
    # end
    types = { characters: 9, starships: 4, vehicles: 4 }
    types.each do |type, limit|
      if @film[type.to_s].count > limit
        all = SwapiService.send(type.to_s)
        results = all.select do |char|
            @film[type.to_s].include?(char['url'])
        end
      else
        results = []
        @film[type.to_s].each do |ship|
          match = ship.match /\/(\w+)\/$/
          results << SwapiService.send(type.to_s, match[1])
        end
      end
      instance_variable_set("@#{type.to_s}", results)
    end
  end
end
