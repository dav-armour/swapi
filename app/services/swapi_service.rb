class SwapiService
  include HTTParty

  base_uri 'swapi.co/api/'

  class << self
    def films
      data = get("/films")
      if data.code.to_i == 200
        data.parsed_response['results']
      else
        raise "Error fetching data from Swapi API"
      end
    end

    def film(episode_id)
      data = get("/films/#{episode_id}")
      if data.code.to_i == 200
        data.parsed_response['results']
      else
        raise "Error fetching data from Swapi API"
      end
    end

    def characters
      data = get("/films")
      if data.code.to_i == 200
        data.parsed_response['results']
      else
        raise "Error fetching data from Swapi API"
      end
    end

    def character(character_id)
      data = get("/films/#{character_id}")
      if data.code.to_i == 200
        data.parsed_response['results']
      else
        raise "Error fetching data from Swapi API"
      end
    end
  end
end
