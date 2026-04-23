import { Schema, Table, column } from '@powersync/web';

const complianceColumns = {
  is_deleted: column.integer,
  user_initials: column.text,
  created_at: column.text,
  updated_at: column.text,
};

const animals = new Table({
  name: column.text,
  species: column.text,
  enclosure_id: column.text,
  birth_date: column.text,
  sex: column.text,
  status: column.text,
  ...complianceColumns,
});

const daily_logs = new Table({
  animal_id: column.text,
  log_type: column.text,
  notes: column.text,
  ...complianceColumns,
});

const daily_rounds = new Table({
  date: column.text,
  assigned_to: column.text,
  status: column.text,
  notes: column.text,
  ...complianceColumns,
});

const feeding_schedules = new Table({
  animal_id: column.text,
  food_type: column.text,
  quantity: column.real,
  time_of_day: column.text,
  ...complianceColumns,
});

const operational_lists = new Table({
  list_name: column.text,
  status: column.text,
  description: column.text,
  ...complianceColumns,
});

const users = new Table({
  email: column.text,
  first_name: column.text,
  last_name: column.text,
  role: column.text,
  ...complianceColumns,
});

const role_permissions = new Table({
  role: column.text,
  permission: column.text,
  ...complianceColumns,
});

export const AppSchema = new Schema({
  animals,
  daily_logs,
  daily_rounds,
  feeding_schedules,
  operational_lists,
  users,
  role_permissions,
});
