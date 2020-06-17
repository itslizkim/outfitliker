class OutfitsController < ApplicationController
    before_action :find_outfit, only: [:show, :update, :destroy]

    def index
        @outfits = Outfit.all
        render json: @outfits
    end

    def show
        render json: @outfit
    end

    def create
        user = User.find_by(username: params[:username])
        outfit = Outfit.create(
            name: params[:name],
            season: params[:season],
            img_url: params[:img_url],
            user_id: user.id, 
            like_count: params[:like_count]
        )
        render json: outfit
    end

    def update
        @outfit.update(outfit_params)
        render json: @outfit
    end

    def destroy
        @outfit.destroy
        render json: { message: "deleted" }
    end

    private

    def find_outfit
        @outfit = Outfit.find_by(id: params[:id])
    end



    def outfit_params
        params.require(:outfit).permit(:id, :name, :season, :img_url, :like_count, :user_id)
    end

end