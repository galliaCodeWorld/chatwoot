class AddFieldToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :alt_email, :string
    # add_column :accounts, :shipping_address, :string
  end
end
