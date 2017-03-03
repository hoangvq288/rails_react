class Employee < ApplicationRecord

  validates :email, :name, presence: true
end
