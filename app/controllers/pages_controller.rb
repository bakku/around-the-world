class PagesController < ApplicationController
  def home = render inertia: "Home"

  def privacy = render inertia: "Privacy"

  def imprint = render inertia: "Imprint"
end
