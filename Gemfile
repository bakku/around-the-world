source "https://rubygems.org"

# Backend
gem "rails", "8.0.2"
gem "sqlite3", "2.6.0"
gem "tzinfo-data", "2.0.6", platforms: %i[ windows jruby ]
gem "solid_cache", "1.0.7"
gem "solid_queue", "1.1.4"
gem "solid_cable", "3.0.7"

# Frontend
gem "inertia_rails", "3.7.0"
gem "vite_rails", "3.0.19"

# Deployment
gem "bootsnap", "1.18.4", require: false
gem "kamal", "2.5.3", require: false
gem "thruster", "0.1.12", require: false
gem "puma", "6.6.0"

group :development, :test do
  gem "debug", "1.10.0", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "brakeman", "7.0.2", require: false
  gem "rubocop-rails-omakase", "1.1.0", require: false
end

group :development do
  gem "web-console", "4.2.1"
end

group :test do
  gem "capybara", "3.40.0"
  gem "selenium-webdriver", "4.30.1"
end
