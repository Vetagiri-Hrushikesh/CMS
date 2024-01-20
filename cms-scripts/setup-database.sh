#!/bin/bash

MYSQL_EXECUTABLE="/Applications/XAMPP/xamppfiles/bin/mysql"

# Prompt the user for action
read -p "Do you want to (c)reate or (d)elete the 'PoliticalManagementDB' database? (c/d): " action

if [ "$action" == "c" ]; then
  # MySQL script to create the 'PoliticalManagementDB' database
  $MYSQL_EXECUTABLE -u root -p < cms-database.sql

  # Check if the database creation was successful
  if [ $? -eq 0 ]; then
    echo "Database PoliticalManagementDB created successfully"
  else
    echo "Error creating database PoliticalManagementDB"
    exit 1
  fi

elif [ "$action" == "d" ]; then
  # MySQL script to delete the 'PoliticalManagementDB' database
  $MYSQL_EXECUTABLE -u root -p -e "DROP DATABASE IF EXISTS PoliticalManagementDB;"

  # Check if the database deletion was successful
  if [ $? -eq 0 ]; then
    echo "Database PoliticalManagementDB deleted successfully"
  else
    echo "Error deleting database PoliticalManagementDB"
    exit 1
  fi

else
  echo "Invalid option. Please enter 'c' for creation or 'd' for deletion."
  exit 1
fi
