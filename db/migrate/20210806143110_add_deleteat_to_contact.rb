class AddDeleteatToContact < ActiveRecord::Migration[6.1]
  def change
    add_column :contacts, :deleted_at, :datetime
  end
end
