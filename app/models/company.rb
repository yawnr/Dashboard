class Company < ActiveRecord::Base

  validates :ticker, :user_id, presence: true

  belongs_to :user

end
