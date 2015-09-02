# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150902182739) do

  create_table "movies", force: :cascade do |t|
    t.string   "title",      null: false
    t.string   "director",   null: false
    t.integer  "year",       null: false
    t.string   "genre",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "movies", ["director"], name: "index_movies_on_director"
  add_index "movies", ["genre"], name: "index_movies_on_genre"
  add_index "movies", ["title", "director", "year"], name: "index_movies_on_title_and_director_and_year", unique: true
  add_index "movies", ["title"], name: "index_movies_on_title"
  add_index "movies", ["year"], name: "index_movies_on_year"

  create_table "stills", force: :cascade do |t|
    t.string   "name",               null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "stills", ["name"], name: "index_stills_on_name", unique: true

  create_table "tags", force: :cascade do |t|
    t.string   "tag",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
