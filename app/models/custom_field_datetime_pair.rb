# frozen_string_literal: true

# == Schema Information
#
# Table name: fields
#
#  id             :integer          not null, primary key
#  as             :string(32)
#  collection     :text
#  disabled       :boolean
#  hint           :string
#  label          :string(128)
#  maxlength      :integer
#  minlength      :integer
#  name           :string(64)
#  placeholder    :string
#  position       :integer
#  required       :boolean
#  settings       :text
#  type           :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  field_group_id :integer
#  pair_id        :integer
#
# Indexes
#
#  index_fields_on_field_group_id  (field_group_id)
#  index_fields_on_name            (name)
#
class CustomFieldDatetimePair < CustomFieldDatePair
  def render(value)
    value&.strftime(I18n.t("time.formats.mmddhhss"))
  end

  ActiveSupport.run_load_hooks(:fat_free_crm_datetime_pair, self)
end
