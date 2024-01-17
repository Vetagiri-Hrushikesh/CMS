#!/bin/bash

MYSQL_EXECUTABLE="/Applications/XAMPP/xamppfiles/bin/mysql"

# MySQL script to create the 'CMSApp' database
$MYSQL_EXECUTABLE -u root -p < cms-database.sql

# Check if the database creation was successful
if [ $? -eq 0 ]; then
  echo "Database CMSApp created successfully"
else
  echo "Error creating database CMSApp"
  exit 1
fi