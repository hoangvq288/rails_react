# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
employees = [
  {name: "hoang", email: "hoang.vu@codebox.vn"},
  {name: "hoang123", email: "hoang.vu288@codebox.vn"}
]

employees.each do |emp|
  Employee.find_or_create_by(emp)
end