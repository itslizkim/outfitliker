class Outfit < ApplicationRecord
    has_many :likes
    belongs_to :user
    has_many :users, :through => :likes

    def user_username
        user.username
    end

    def like_count
        self.likes.length
    end

end