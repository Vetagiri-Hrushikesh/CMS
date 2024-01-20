#!/bin/bash

MYSQL_EXECUTABLE="/Applications/XAMPP/xamppfiles/bin/mysql"

# Prompt the user for action
read -p "Do you want to (c)reate, (d)elete, or (r)eset the 'PoliticalManagementDB' database? (c/d/r): " action

if [ "$action" == "c" ]; then
  # MySQL script to create the 'PoliticalManagementDB' database
  $MYSQL_EXECUTABLE -u root -p < create-database.sql

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

elif [ "$action" == "r" ]; then
  # MySQL script to reset the 'PoliticalManagementDB' database
  $MYSQL_EXECUTABLE -u root -p < create-database.sql
  $MYSQL_EXECUTABLE -u root -p < insert-database.sql

  # Check if the database reset was successful
  if [ $? -eq 0 ]; then
    echo "Database PoliticalManagementDB reset successfully"
  else
    echo "Error resetting database PoliticalManagementDB"
    exit 1
  fi

else
  echo "Invalid option. Please enter 'c' for creation, 'd' for deletion, or 'r' for reset."
  exit 1
fi
