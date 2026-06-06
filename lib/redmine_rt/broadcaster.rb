module RedmineRt
  class Broadcaster
    class << self
      def broadcast(channel_name, data)
        if Rails::VERSION::MAJOR >= 5
          ActionCable.server.broadcast channel_name, data
        else
          WebsocketRails[channel_name].trigger('ALL', data)
        end
        true
      rescue StandardError => e
        Rails.logger.warn("[redmine_rt] broadcast failed channel=#{channel_name.inspect}: #{e.class}: #{e.message}")
        if Rails.env.production?
          false
        else
          raise
        end
      end
    end
  end	
end
