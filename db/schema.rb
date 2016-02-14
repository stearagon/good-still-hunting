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

ActiveRecord::Schema.define(version: 20160122030100) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "movies", force: :cascade do |t|
    t.string   "title",      null: false
    t.string   "director",   null: false
    t.integer  "year",       null: false
    t.string   "genre",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "movies", ["director"], name: "index_movies_on_director", using: :btree
  add_index "movies", ["genre"], name: "index_movies_on_genre", using: :btree
  add_index "movies", ["title", "director", "year"], name: "index_movies_on_title_and_director_and_year", unique: true, using: :btree
  add_index "movies", ["title"], name: "index_movies_on_title", using: :btree
  add_index "movies", ["year"], name: "index_movies_on_year", using: :btree

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "pg_search_documents", ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id", using: :btree

  create_table "stills", force: :cascade do |t|
    t.string   "name",               null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "movie_id",           null: false
  end

  add_index "stills", ["name"], name: "index_stills_on_name", unique: true, using: :btree

  create_table "stills_tags", force: :cascade do |t|
    t.integer  "still_id",   null: false
    t.integer  "tag_id",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "stills_tags", ["still_id"], name: "index_stills_tags_on_still_id", using: :btree
  add_index "stills_tags", ["tag_id"], name: "index_stills_tags_on_tag_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "tag",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tags", ["tag"], name: "index_tags_on_tag", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
