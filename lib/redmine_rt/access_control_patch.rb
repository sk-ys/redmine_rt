# frozen_string_literal: true

module RedmineRt
  module AccessControlPatch
    def self.apply
      unless Redmine::AccessControl.singleton_class.included_modules.include?(InstanceMethods)
        Redmine::AccessControl.singleton_class.prepend(InstanceMethods)
      end
    end

    module InstanceMethods
      # Ensure permissions returns an array instead of nil
      def permissions
        @permissions ||= []
      end
    end
  end
end
