# frozen_string_literal: true

# Copyright (c) 2008-2013 Michael Dvorkin and contributors.
#
# Fat Free CRM is freely distributable under the terms of MIT license.
# See MIT-LICENSE file or http://www.opensource.org/licenses/mit-license.php
#------------------------------------------------------------------------------
class Api::V3::Admin::TagsController < Api::V3::Admin::ApplicationController
 
  def index
    @tag = Tag.all
    render json: {data: @tag.to_json, success: true}, status: 200
  end
 
  def show
    @tag = Tag.find_by_id(params[:id])
    render json: {data: @tag.to_json, success: true}, status: 200
  end
  
  def create
    @tag = Tag.new(tag_params)
    if @tag.save
      render json: {data: @tag.to_json, success: true}, status: 200
    else
      render json: {msg: @tag.errors, success: false}, status: 500
    end
  end

  def update
    @tag = Tag.find_by_id(params[:id])

    if @tag.update(tag_params)
      render json: {data: @tag, success: true}, status: 200
    else
      render json: {msg: @tag.errors, success: false}, status: 500
    end
  end
  
  def destroy
    @tag = Tag.find_by_id(params[:id])
    if @tag.destroy
     render json: {data: @tag, success: true}, status: 200
    else
      render json: {msg: @tag.errors, success: false}, status: 500
    end
  end

  protected

  def tag_params
    params.permit(:name, :taggings_count)
  end
end
