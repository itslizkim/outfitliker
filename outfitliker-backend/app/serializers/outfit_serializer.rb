class OutfitSerializer < ActiveModel::Serializer
    attributes :id, :name, :season, :img_url, :user_username, :like_count
end