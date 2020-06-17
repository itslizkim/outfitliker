class User < ApplicationRecord
    has_many :likes
    has_many :outfits
    has_many :liked_outfits, :through => :likes, :source => :outfit

    validates :username, presence: true

end