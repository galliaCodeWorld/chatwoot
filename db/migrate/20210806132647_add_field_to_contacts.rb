class AddFieldToContacts < ActiveRecord::Migration[6.1]
  def change
    add_column :contacts, :alt_email, :string
  end
end
