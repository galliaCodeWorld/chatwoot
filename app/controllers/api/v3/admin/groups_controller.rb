# frozen_string_literal: true

# Copyright (c) 2008-2013 Michael Dvorkin and contributors.
#
# Fat Free CRM is freely distributable under the terms of MIT license.
# See MIT-LICENSE file or http://www.opensource.org/licenses/mit-license.php
#------------------------------------------------------------------------------
class Api::V3::Admin::GroupsController < Api::V3::Admin::ApplicationController

  def create
    @group = Group.new(group_params)
    if @group.save
      render json: {data: @group.to_json, success: true} , status: 200
    else
      render json: {data: @group.errors.to_json, success: true}, status: 500
    end
  end

  def index
    @group = Group.all
    render json: {data: @group.to_json(include: [:users]), success: true }, status: 200
  end

  def show
    @group = Group.find_by_id(params[:id])
    render json: {data: @group.to_json, success: true}, status: 200
  end

  def show
    @group = Group.find_by(id: params[:id])
    render json: {data: @group.to_json(include: [:users]), success: true }, status: 200
  end

  def update
    @group = Group.find(params[:id])
    
    if @group.update(group_params)
      render json: @group, status: 200
    else
      render json: @group.errors, status: 500
    end
  end

  def destroy
    @group = Group.find(params[:id])
    render json: @group.destroy
  end

  protected

  def group_params
    params.permit(:name, user_ids: [])
  end
end
