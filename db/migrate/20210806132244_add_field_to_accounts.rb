class AddFieldToAccounts < ActiveRecord::Migration[6.1]
  def change
    add_column :accounts, :uuid, :string
    add_column :accounts, :email, :string
    add_column :accounts, :deleted_at, :timestamp
  end
end
