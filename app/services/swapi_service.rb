class SwapiService
  include HTTParty

  base_uri 'swapi.co/api/'

  class << self
    def films(episode_id = nil)
      if (episode_id)
        get_single("films", episode_id)
      else
        get_all("films")
      end
    end

    def characters(character_id = nil)
      if (character_id)
        get_single('people', character_id)
      else
        get_all('people')
      end
    end

    def planets(planet_id = nil)
      if (planet_id)
        get_single('planets', planet_id)
      else
        get_all('planets')
      end
    end

    def starships(starship_id = nil)
      if (starship_id)
        get_single('starships', starship_id)
      else
        get_all('starships')
      end
    end

    def vehicles(vehicle_id = nil)
      if (vehicle_id)
        get_single('vehicles', vehicle_id)
      else
        get_all('vehicles')
      end
    end

    def species(species_id = nil)
      if (species_id)
        get_single('species', species_id)
      else
        get_all('species')
      end
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
