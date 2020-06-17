class UserSerializer < ActiveModel::Serializer
    attributes :username, :id, :liked_outfits, :outfits
end