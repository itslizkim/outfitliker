class LikesController < ApplicationController

  def index
    likes = Like.all
    render json: likes
  end

  def show
    like = Like.find_by(id: params[:id])
    render json: like
  end
    
  def create
    like = Like.create(like_params)
    render json: like.outfit
  end

  def like_params
    params.require(:like).permit(:id, :user_id, :outfit_id)
  end

end