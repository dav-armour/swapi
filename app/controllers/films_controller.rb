class FilmsController < ApplicationController
  def index
    @films = SwapiService.films
  end

  def show
    @film = SwapiService.films(params[:id])
    # Hash of resource types and total pages of data
    types = { characters: 9, planets: 7, starships: 4, vehicles: 4, species: 4  }
    Parallel.each(types, in_threads: 5) do |type, limit|
      # Get all records and filter if it will be less api requests
      if @film[type.to_s].count > limit
        all = SwapiService.send(type.to_s)
        results = all.select do |record|
            @film[type.to_s].include?(record['url'])
        end
      else # Otherwise get individual records
        results = []
        @film[type.to_s].each do |url|
          match = url.match /\/(\w+)\/$/
          results << SwapiService.send(type.to_s, match[1])
        end
      end
      instance_variable_set("@#{type.to_s}", results)
    end
  end
end
