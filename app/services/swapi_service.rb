class SwapiService
  include HTTParty

  base_uri 'swapi.co/api/'

  class << self
    def films
      get_all("films")
    end

    def film(episode_id)
      get_single('films', episode_id)
    end

    def characters
      get_all('people')
    end

    def character(character_id)
      get_single('people', character_id)
    end

    def planets
      get_all('planets')
    end

    def planet(planet_id)
      get_single('planets', planet_id)
    end

    def starships
      get_all('starships')
    end

    def starship(starship_id)
      get_single('starships', starship_id)
    end

    def vehicles
      get_all('vehicles')
    end

    def vehicle(vehicle_id)
      get_single('vehicles', vehicle_id)
    end

    def species
      get_all('species')
    end

    def specie(specie_id)
      get_single('species', specie_id)
    end

    protected

    def get_all(path)
      results = []
      x = 1
      loop do
        data = get("/#{path}/?page=#{x}")
        if data.code.to_i == 200
          results.push(*data.parsed_response['results'])
        else
          raise "Error fetching data from Swapi API"
        end
        break unless data.parsed_response['next']
        x += 1
      end
      results
    end

    def get_single(path, id)
      data = get("/#{path}/#{id}")
      if data.code.to_i == 200
        data.parsed_response
      else
        raise "Error fetching data from Swapi API"
      end
    end
  end
end
