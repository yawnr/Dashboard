class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :name
      t.string :ticker, null: false
      t.integer :user_id, index: true

      t.timestamps null: false
    end
  end
end
